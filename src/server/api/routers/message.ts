import { messageSchema } from "@/lib/validators";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const messageRouter = createTRPCRouter({
  createMessage: privateProcedure
    .input(messageSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.message.create({
        data: {
          ...input,
        },
      });
    }),
});
