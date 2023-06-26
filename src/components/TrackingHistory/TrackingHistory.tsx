import { Checkpoint } from '@prisma/client'
import { useMemo } from 'react'

const Checkpoint: FC<{ item: Checkpoint, current: boolean }> = ({ item, current }) => {
  return (
    <div className='flex sm:flex-row justify-end flex-row-reverse gap-1 items-start'>
      <div
        data-current={current}
        className='whitespace-nowrap data-[current=true]:font-bold'
      >
        {item.statusText}
      </div>
      <div
        data-current={current}
        className='flex items-center justify-center w-[16px] h-[16px] rounded-full data-[current=true]:bg-blue-600 bg-lime-400'
      >
        <div
          data-current={current}
          className='w-[8px] h-[8px] rounded-full  data-[current=true]:bg-blue-400 bg-lime-300'
        />
      </div>
    </div>
  )
}
const VerticalDash: FC = () => {
  return (
    <div className='w-1 bg-blue-500 h-[32px] rounded my-1' />
  )
}
export const TrackingHistory: FC<{
  checkpoints: Checkpoint[],
  limit: number
}> = ({ checkpoints, limit }) => {
  const list = useMemo(() => checkpoints.slice(0, limit), [checkpoints, limit])
  return (
    <div className='flex flex-col'>
      {
        list.map((item, index) => {
          return (
            <div
              key={item.id}
              className='flex flex-col text-xs'
            >
              <Checkpoint
                item={item}
                current={index === 0}
              />
              {
                index !== list.length - 1 ? (
                  <div className='sm:mr-1.5 sm:self-end ml-1.5 self-start'>
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
