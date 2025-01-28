import OpenAI from "openai";

import { env } from "@/env";

const genAI = new OpenAI({
  apiKey: env.OPENAI_KEY,
});

export const getEmbeddings = async (summary: string) => {
  const response = await genAI.embeddings.create({
    model: "text-embedding-ada-002",
    input: summary,
  });

  return response.data[0]?.embedding;
};
