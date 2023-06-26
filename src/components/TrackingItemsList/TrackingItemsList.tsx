import { Tracking, Checkpoint } from '@prisma/client'
import Link from 'next/link'
import { useMemo } from 'react'

export type TrackingListItem = Tracking & { checkpoints: Checkpoint [] }

const Checkpoint: FC<{ item: Checkpoint, current: boolean }> = ({ item, current }) => {
  return (
    <div className="flex sm:flex-row justify-end flex-row-reverse gap-1 items-start">
      <div className="whitespace-nowrap">
        {item.statusText}
      </div>
      <div
        data-current={current}
        className="flex items-center justify-center w-[16px] h-[16px] rounded-full data-[current=true]:bg-blue-600 bg-lime-400"
      >
        <div
          data-current={current}
          className="w-[8px] h-[8px] rounded-full  data-[current=true]:bg-blue-400 bg-lime-300"
        />
      </div>
    </div>
  )
}

const VerticalDash: FC = () => {
  return (
    <div className="w-1 bg-blue-500 h-[32px] rounded my-1" />
  )
}

const StatusPreview: FC<{
  checkpoints: Checkpoint[],
  limit: number
}> = ({ checkpoints, limit }) => {
  const list = useMemo(() => checkpoints.slice(0, limit), [checkpoints, limit])
  return (
    <div className="flex flex-col">
      {
        list.map((item, index) => {
          return (
            <div
              key={item.id}
              className="flex flex-col text-xs"
            >
              <Checkpoint
                item={item}
                current={index === 0}
              />
              {
                index !== list.length - 1 ? (
                  <div className="sm:mr-1.5 sm:self-end ml-1.5 self-start">
                    <VerticalDash />
                  </div>
                ) : null
              }
            </div>
          )
        })
      }
    </div>
  )
}


const LabeledBlock: FC<{ label: string }, true> = ({ children, label }) => {
  return (
    <div className='flex flex-col gap'>
      <div className='text-xs'>
        {label}
      </div>
      <div className='break-words'>
        {children}
      </div>
    </div>
  )
}
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
        <StatusPreview
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
