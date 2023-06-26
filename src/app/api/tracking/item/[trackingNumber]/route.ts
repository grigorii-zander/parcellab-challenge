import { routeHandler } from '~/core/route-handler'
import { DeliveryItem, Checkpoint, Tracking, Article } from '@prisma/client'
import { getTrackingItemByTrackingNumber } from '~/prisma/services/tracking'
import z from 'zod'
import { HttpStatusCode } from '~/core/http'
import { throwNotFoundException } from '~/core/exceptions'

type DeliveryItemWithArticle = DeliveryItem & { article: Article }
export type Item = Tracking & { checkpoints: Checkpoint[], items: DeliveryItemWithArticle[] }

const getParamsSchema = z.object({
  trackingNumber: z.string(),
})
export type GetParams = z.infer<typeof getParamsSchema>

const getQuerySchema = z.object({
  checkpointsCount: z.coerce.number().max(100).optional().default(10),
})

export type GetQuery = z.infer<typeof getQuerySchema>

export type GetResponse = {
  result: Item
}

export const GET = routeHandler<GetResponse>()({
  inject: {
    getTrackingItemByTrackingNumber,
  },
  paramsSchema: getParamsSchema,
  querySchema: getQuerySchema,
}, async ({ params, query, getTrackingItemByTrackingNumber }) => {

  const item = await getTrackingItemByTrackingNumber({
    trackingNumber: params.trackingNumber,
    checkpointsCount: query.checkpointsCount,
  })

  if(!item) {
    throwNotFoundException('Item not found')
  }

  return {
    status: HttpStatusCode.Ok,
    result: item,
  }
})
