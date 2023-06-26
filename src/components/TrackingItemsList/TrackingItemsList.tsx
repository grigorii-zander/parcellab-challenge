import { Checkpoint, Tracking } from '@prisma/client'
import Link from 'next/link'
import { LabeledBlock } from '~/components/LabeledBlock/LabeledBlock'
import { TrackingHistory } from '~/components/TrackingHistory/TrackingHistory'

export type TrackingListItem = Tracking & { checkpoints: Checkpoint[]  }

const TrackingItem: FC<{ item: TrackingListItem }> = ({ item }) => {
  return (
    <Link
      className='flex flex-col justify-start sm:flex-row sm:justify-between p-2 shadow-md border-2 rounded min-w-0 gap-2 hover:border-sky-600 transition-colors'
      href={`/tracking/${item.trackingNumber}`}
    >
      <div className="flex flex-col p-2">
        <div className='text-lg pb-1 whitespace-nowrap'>
          Order info
        </div>
        <div className="flex flex-col gap-2">
          <LabeledBlock label={'Order number'}>
            {item.orderNo}
          </LabeledBlock>
          <LabeledBlock label={'Tracking number'}>
            {item.trackingNumber}
          </LabeledBlock>
          <LabeledBlock label={'Delivery address'}>
            <div className='flex gap-x-2 justify-start flex-wrap'>
              <div className='break-all'>
                {item.street}
              </div>
              <div className='break-all'>
                {item.zip}
              </div>
              <div className='break-all'>
                {item.city}
              </div>
            </div>
          </LabeledBlock>
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className='text-lg pb-1 whitespace-nowrap sm:text-end text-start'>
          Recent Status
        </div>
        <TrackingHistory
          checkpoints={item.checkpoints}
          limit={3}
        />
      </div>
    </Link>
  )
}

export const TrackingItemsList: FC<{ items: TrackingListItem[] }> = ({ items }) => {
  return (
    <div className='grid sm:auto-cols-min auto-cols-auto gap-2 p-2'>
      {
        items.map(item => (
          <TrackingItem
            item={item}
            key={item.id}
          />
        ))
      }
    </div>
  )
}
