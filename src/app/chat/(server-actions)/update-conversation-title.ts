"use server";

import OpenAI from "openai";

import { env } from "@/env";
import { db } from "@/server/db";

const client = new OpenAI({
  apiKey: env.OPENAI_KEY,
});

export async function generateConversationTitle(
  query: string,
  conversationId: string
) {
  try {
    const response = await client.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "user",
          content: `Generate a concise title for the following query:\n\n"${query}"\n\nThe title should be no more than 5 words.`,
        },
      ],
      max_tokens: 10,
      temperature: 0.7,
    });

    const title =
      response.choices[0]?.message?.content?.trim() || "Untitled Conversation";

    await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        name: title,
      },
    });
  } catch (error) {
    console.error("Error generating conversation title:", error);
  }
}
