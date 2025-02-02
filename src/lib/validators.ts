import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  lastName: z.string().optional(),
  imageUrl: z.string().optional(),
  firstName: z.string().optional(),
});

export const messageSchema = z.object({
  content: z.string(),
  conversationId: z.string(),
  type: z.enum(["CLIENT", "BOT"]),
});
