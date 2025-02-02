"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";



import { env } from "@/env";
import { performWebSearch } from "@/lib/web-search";
import { db } from "@/server/db";



import { parseSpreadsheet } from "./excel-parser";
import { parseImage } from "./image-parser";
import { parsePdf } from "./pdf-parser";
import { generateConversationTitle } from "./update-conversation-title";
import { parseDocument } from "./word-parser";





const openAI = createOpenAI({
  apiKey: env.OPENAI_KEY,
});

type ImageArray = {
  type: "image";
  image: string;
};

export async function askQuestion(
  query: string,
  webSearch: boolean,
  conversationId: string,
  file?: File | File[]
) {
  let webSearchContent = "";
  let combinedFileContent = "";
  const imageFiles: ImageArray[] = [];
  const stream = createStreamableValue();
  let formattedPreviousMessages: AIMessage[] = [];
  const fileArray = Array.isArray(file) ? file : file ? [file] : [];

  const previousMessages = await db.message.findMany({
    where: {
      conversationId,
    },
  });

  const findConversation = await db.conversation.findUnique({
    where: {
      id: conversationId,
    },
  });

  if (findConversation) {
    if (findConversation.name === "New chat") {
      await generateConversationTitle(query, conversationId);
    }
  }

  if (previousMessages) {
    formattedPreviousMessages = previousMessages.slice(-10).map((message) => ({
      role: message.type === "CLIENT" ? "user" : "assistant",
      content: [{ type: "text", text: message.content }],
    }));
  }

  for (const file of fileArray) {
    if (file.name.endsWith(".pdf")) {
      const { text } = await parsePdf(file);
      combinedFileContent += `${text}\n\n`;
    }

    if (file.type.startsWith("image/")) {
      const imageUrl = await parseImage(file);
      imageFiles.push({ type: "image", image: `${imageUrl}` });
    }

    if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
      const text = await parseDocument(file);
      combinedFileContent += `${text}\n\n`;
    }

    if (file.name.endsWith(".xlsx") || file.name.endsWith(".csv")) {
      const text = await parseSpreadsheet(file);
      combinedFileContent += `${text}\n\n`;
    }
  }

  if (webSearch) {
    try {
      webSearchContent = await performWebSearch(query);
    } catch (error) {
      console.error(error);
      webSearchContent = "\n[Web search unavailable at this time]";
    }
  }

  (async () => {
    const { textStream } = await streamText({
      model: openAI("chatgpt-4o-latest"),
      messages: [
        ...formattedPreviousMessages,
        {
          role: "user",
          content: [
            ...imageFiles,
            { type: "text", text: query },
            { type: "text", text: combinedFileContent },
            { type: "text", text: webSearchContent },
            {
              type: "text",
              text: "Current Date: " + new Date().toISOString().split("T")[0],
            },
            {
              type: "text",
              text:
                "Answer using a combination of uploaded content (if relevant) and web search results. " +
                "Always cite sources using [number] notation which must be hyperlinked with the web url. Mention when information comes from web results.",
            },
          ],
        },
      ],
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return {
    output: stream.value,
  };
}

export const maxDuration = 30;