"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

import { env } from "@/env";

import { parsePdf } from "./pdf-parser";

const openAI = createOpenAI({
  apiKey: env.OPENAI_KEY,
});

export async function askQuestion(query: string, file?: File | File[]) {
  let combinedFileContent = "";
  const stream = createStreamableValue();
  const fileArray = Array.isArray(file) ? file : file ? [file] : [];

  for (const file of fileArray) {
    const { text } = await parsePdf(file);
    combinedFileContent += text + "\n\n";
  }

  (async () => {
    const { textStream } = await streamText({
      model: openAI("chatgpt-4o-latest"),
      prompt: `${query} ${combinedFileContent ? combinedFileContent : ""}`,
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
