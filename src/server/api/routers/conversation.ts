import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const conversationRouter = createTRPCRouter({
  createConversation: privateProcedure.mutation(async ({ ctx }) => {
    const conversation = await ctx.db.conversation.create({
      data: {
        name: "New chat",
        userId: ctx.user.userId!,
      },
    });

    return conversation;
  }),
  getConversations: privateProcedure.query(async ({ ctx }) => {
    return await ctx.db.conversation.findMany({
      where: {
        userId: ctx.user.userId!,
      },
      include: {
        messages: true,
      },
    });
  }),
  deleteConversation: privateProcedure
    .input(z.object({ conversationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.conversation.delete({
        where: {
          id: input.conversationId,
        },
      });
    }),
  getConversation: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.conversation.findFirst({
        where: {
          id: input.id,
        },
        include: {
          messages: true,
        },
      });
    }),
});
