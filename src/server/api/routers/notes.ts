import { z } from "zod"
import { createTRPCRouter, privateProcedure } from "../trpc"

export const noteRouter = createTRPCRouter({
  create: privateProcedure.input(z.object({title: z.string().min(1).max(280), content : z.string().max(280)}))
  .mutation(async ({ctx, input}) => {
    const authorId = ctx.userId;
    const note = await ctx.prisma.note.create({
      data: {
        title: input.title,
        content: input.content,
        authorId,
      }
    });
    return note;
  })
})
