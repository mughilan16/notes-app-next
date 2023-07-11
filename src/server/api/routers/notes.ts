import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { contextProps } from "@trpc/react-query/shared";

export const noteRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1).max(280),
        content: z.string().max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const note = await ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          authorId,
        },
      });
      return note;
    }),
  edit: privateProcedure
    .input(
      z.object({
        title: z.string().min(1).max(280),
        content: z.string().max(280),
        id: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
        },
      });
      return note;
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
      return note;
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    const notes = ctx.prisma.note.findMany({
      where: {
        authorId: ctx.userId,
      },
      select: {
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        id: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notes;
  }),
});
