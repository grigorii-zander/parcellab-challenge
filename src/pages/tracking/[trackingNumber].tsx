import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useTrackingItem } from '~/hooks/tracking/useTrackingItem'
import { TrackingItem } from '~/components/TrackingItem/TrackingItem'
import { Spinner } from '~/components/Spinner/Spinner'

type PageProps = {
  trackingNumber: string
}

const TrackingItemPage: PageFC<PageProps> = ({ trackingNumber }) => {
  const { data } = useTrackingItem(trackingNumber)

  return (
    <div>
      <Head>
        <title>
          Your item
          {' '}
          {trackingNumber}
        </title>
        <meta
          name="description"
          content="ParcelLab fullstack challenge"
        />
      </Head>
      <main>
        <div className="flex flex-col p-2 m-2 items-center">
          <div className="rounded shadow-md border-2 p-4">
            {data?.result ? <TrackingItem item={data.result} /> : <Spinner />}
          </div>
        </div>
      </main>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  let trackingNumber = ctx.params?.trackingNumber
  trackingNumber = Array.isArray(trackingNumber) ? trackingNumber[ 0 ] : trackingNumber

  if(!trackingNumber) {
    throw new Error('Tracking number is not set')
  }

  return {
    props: {
      trackingNumber,
    },
  }
}

TrackingItemPage.requireAuth = true
export default TrackingItemPage
