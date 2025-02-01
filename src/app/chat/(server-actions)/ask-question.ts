"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

import { env } from "@/env";

import { parseSpreadsheet } from "./excel-parser";
import { parseImage } from "./image-parser";
import { parsePdf } from "./pdf-parser";
import { parseDocument } from "./word-parser";

const openAI = createOpenAI({
  apiKey: env.OPENAI_KEY,
});

type ImageArray = {
  type: "image";
  image: string;
};

export async function askQuestion(query: string, file?: File | File[]) {
  let combinedFileContent = "";
  const imageFiles: ImageArray[] = [];
  const stream = createStreamableValue();
  const fileArray = Array.isArray(file) ? file : file ? [file] : [];

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

  (async () => {
    const { textStream } = await streamText({
      model: openAI("chatgpt-4o-latest"),
      messages: [
        {
          role: "user",
          content: [
            ...imageFiles,
            { type: "text", text: query },
            { type: "text", text: combinedFileContent },
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
