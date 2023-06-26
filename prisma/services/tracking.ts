import { prisma } from '~/prisma/db'

export const getTrackingList = ({
  email,
  cursor,
  take,
  checkpointsCount = 0,
}: {
  email: string
  take: number
  cursor?: string,
  checkpointsCount?: number
}) => {
  return prisma.tracking.findMany({
    where: {
      email,
    },
    include: {
      checkpoints: {
        take: checkpointsCount,
        orderBy: {
          timestamp: 'desc',
        },
      },
    },
    take,
    skip: cursor ? 1: 0,
    cursor: cursor
      ? {
        id: cursor,
      }
      : undefined,
  })
}
