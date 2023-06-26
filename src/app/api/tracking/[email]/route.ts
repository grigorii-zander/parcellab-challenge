import z from 'zod'
import { Tracking, Checkpoint } from '@prisma/client'
import { routeHandler } from '~/core/route-handler'
import { getTrackingList } from '~/prisma/services/tracking'
import { HttpStatusCode } from '~/core/http'


export type ListItem = Tracking & { checkpoints: Checkpoint[] }
export type GetResponse = {
  result: ListItem[]
}

const getQuerySchema = z.object({
  cursor: z.coerce.string().optional(),
  take: z.coerce.number().min(1).optional().default(10),
  checkpoints: z.coerce.number().min(1).max(100).optional().default(3),
})
export type GetQuery = z.infer<typeof getQuerySchema>

const getParamsSchema = z.object({
  email: z.coerce.string().email(),
})
export type GetParams = z.infer<typeof getParamsSchema>

export const GET = routeHandler<GetResponse>()({
  inject: {
    getTrackingList,
  },
  paramsSchema: getParamsSchema,
  querySchema: getQuerySchema,
}, async ({ getTrackingList, params, query }) => {

  const list = await getTrackingList({
    cursor: query.cursor,
    take: query.take,
    checkpointsCount: query.checkpoints,
    email: params.email,
  })

  return {
    status: HttpStatusCode.Ok,
    result: list,
  }
})
