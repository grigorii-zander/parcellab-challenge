import logger from '~/core/logger'
import { CheckpointStatus } from '@prisma/client'
import { prisma } from '~/prisma/db'

async function seedData() {

  await prisma.tracking.create({
    data: {
      trackingNumber: '00340000161200000001',
      orderNo: 'ORD-123-2018',
      courier: 'DHL',
      street: 'Landwehrstr. 39',
      zip: '80336',
      city: 'München',
      destinationCountryISO3: 'DEU',
      email: 'julian@parcellab.com',

      checkpoints: {
        create: [
          {
            status: CheckpointStatus.OrderProcessed,
            statusText: 'Order processed',
            statusDetails: 'The order has been processed.',
            timestamp: '2018-04-01T00:00:00.000Z',
          },
          {
            status: CheckpointStatus.PickUpPlanned,
            statusText: 'Pick-up planned',
            statusDetails: 'The goods will be handed over to the logistics company at the latest at the defined time.',
            timestamp: '2018-04-04T23:00:00.000Z',
          },
          {
            status: CheckpointStatus.Upgrade,
            statusText: 'Finishing',
            statusDetails: 'The goods are being finished and personalised.',
            timestamp: '2018-04-04T12:17:00.000Z',
          },
          {
            status: CheckpointStatus.InboundScan,
            location: 'Feucht',
            statusText: 'Dispatched',
            statusDetails: 'The goods have been sent.',
            timestamp: '2018-04-04T18:14:59.000Z',
          },
          {
            status: CheckpointStatus.DestinationDeliveryCenter,
            location: 'Rüdersdorf',
            statusText: 'Delivery is being prepared',
            statusDetails: 'The goods have arrived in the destination region.',
            timestamp: '2018-04-06T04:54:00.000Z',
          },
          {
            status: CheckpointStatus.Scheduled,
            statusText: 'Delivery date set',
            statusDetails: 'An appointment to make the delivery has been made. The goods will be delivered on Saturday, Apr 7th, 2018, between 9:30 am and 1:00 pm.',
            timestamp: '2018-04-06T05:58:00.000Z',
          },
        ],
      },

      items: {
        create: [
          {
            quantity: 1,
            article: {
              create: {
                articleNo: 'A-B2-U',
                imageUrl: 'https://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg',
                name: 'parcelLab Tote Bag',
              },
            },
          },
          {
            quantity: 2,
            article: {
              create: {
                articleNo: 'A-C1-L',
                imageUrl: 'https://cdn.parcellab.com/img/sales-cannon/parcellab-cap.jpg',
                name: 'parcelLab Tote Bag',
              },
            },
          },
        ],
      },
    },
  })

  await prisma.tracking.create({
    data: {
      trackingNumber: '00331612197202003141',
      orderNo: '780XX004',
      courier: 'DHL',
      street: 'Schillerstr. 23a',
      zip: '10625',
      city: 'Berlin',
      destinationCountryISO3: 'DEU',
      email: 'julian@parcellab.com',

      checkpoints: {
        create: [
          {
            status: CheckpointStatus.OrderProcessed,
            statusText: 'Order processed',
            statusDetails: 'The order has been processed.',
            timestamp: '2020-03-01T00:00:00.000Z',
          },
        ],
      },
    },
  })

}

async function main() {
  await seedData()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    logger.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
