import { Checkpoint, Tracking, DeliveryItem, Article } from '@prisma/client'
import { LabeledBlock } from '~/components/LabeledBlock/LabeledBlock'
import { TrackingHistory } from '~/components/TrackingHistory/TrackingHistory'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

type DeliveryItemWithArticle = DeliveryItem & { article: Article }
export type Item = Tracking & { checkpoints: Checkpoint [], items: DeliveryItemWithArticle[] }

const DeliveryItem: FC<{ item: DeliveryItemWithArticle }> = ({ item }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-sm font-light w-12 text-center">
        x
        {item.quantity}
      </div>
      <div className="flex gap-4 items-center">
        <div>
          {item.article.imageUrl ? (
            <img
              className="max-w-[48px] max-h-[48px] rounded"
              src={item.article.imageUrl}
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-bold">
            {item.article.name}
          </div>
          <div className="text-sm font-light">
            {item.article.articleNo}
          </div>
        </div>
      </div>
    </div>
  )
}

const DeliveryItemsList: FC<{ items: DeliveryItemWithArticle[] }> = ({ items }) => {

  if(!items.length) {
    return (
      <div className="flex gap-2 items-center">
        <ExclamationTriangleIcon className="w-[18px] text-yellow-400" />
        <div>
          No data available
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <DeliveryItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}

export const TrackingItem: FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="flex sm:flex-row flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className='text-lg pb-1 whitespace-nowrap'>
            Order Info
          </h2>
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
        <div>
          <h2 className='text-lg pb-1 whitespace-nowrap mb-2'>
            Articles
          </h2>
          <DeliveryItemsList items={item.items} />
        </div>
      </div>
      <div>
        <h2 className='text-lg pb-1 whitespace-nowrap'>
          Tracking History
        </h2>
        <TrackingHistory
          checkpoints={item.checkpoints}
          limit={Infinity}
        />
      </div>
    </div>
  )
}
