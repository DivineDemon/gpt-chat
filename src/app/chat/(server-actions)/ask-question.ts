"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

import { env } from "@/env";
import { getEmbeddings } from "@/lib/openai";

const openAI = createOpenAI({
  apiKey: env.OPENAI_KEY,
});

export async function askQuestion(query: string, file?: File | File[]) {
  await getEmbeddings(query);
  let combinedFileContent = "";
  const stream = createStreamableValue();
  const fileArray = Array.isArray(file) ? file : file ? [file] : [];

  for (const file of fileArray) {
    const content = "await extractFileContent(file)";
    combinedFileContent += content + "\n\n";
  }

  const fileEmbeddings =
    combinedFileContent.trim().length > 0
      ? await getEmbeddings(combinedFileContent)
      : null;

  (async () => {
    const { textStream } = await streamText({
      model: openAI("chatgpt-4o-latest"),
      prompt: `${query} ${fileEmbeddings ? combinedFileContent : ""}`,
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
