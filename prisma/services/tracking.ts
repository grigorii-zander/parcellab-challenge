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

export const getTrackingItemByTrackingNumber = ({
  trackingNumber,
  checkpointsCount,
}: { trackingNumber: string, checkpointsCount?: number }) => {
  return prisma.tracking.findUnique({
    where: {
      trackingNumber,
    },
    include: {
      checkpoints: {
        take: checkpointsCount,
        orderBy: {
          timestamp: 'desc',
        },
      },
      items: {
        include: {
          article: true,
        },
      },
    },
  })
}
