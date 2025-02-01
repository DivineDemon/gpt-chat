"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

import { env } from "@/env";

import { parseImage } from "./image-parser";
import { parsePdf } from "./pdf-parser";

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
    } else {
      const imageUrl = await parseImage(file);
      imageFiles.push({ type: "image", image: `${imageUrl}` });
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
