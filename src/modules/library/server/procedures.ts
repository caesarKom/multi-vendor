import { Media, Tenant } from "@/payload-types"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { z } from "zod"
import { DEFAULT_LIMIT } from "@/constants"

export const libraryRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const orderData = await ctx.db.find({
        collection: "orders",
        depth: 0, //Without Populate
        page: input.cursor,
        limit: input.limit,
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
      })

      const productIds = orderData.docs.map((order) => order.product)
      const productData = await ctx.db.find({
        collection: "products",
        pagination: false,
        where: {
          id: {
            in: productIds,
          },
        },
      })

      return {
        ...productData,
        docs: productData.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      }
    }),
})
