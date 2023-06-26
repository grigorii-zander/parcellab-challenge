import Head from 'next/head'
import { useTrackingList } from '~/hooks/tracking/useTrackingList'
import { useUserSession } from '~/hooks/useUserSession'
import { TrackingItemsList } from '~/components/TrackingItemsList/TrackingItemsList'
import { Spinner } from '~/components/Spinner/Spinner'
import { ErrorBlock } from '~/components/ErrorBlock/ErrorBlock'

const Home: PageFC = () => {
  const { email } = useUserSession()
  const { data, isLoading, error } = useTrackingList(email)

  const renderContent = () => {
    if(error) {
      return (
        <ErrorBlock message={error.error.message} />
      )
    }

    if(isLoading) {
      return (
        <Spinner />
      )
    }

    if(!data || !data.result.length) {
      return (
        <ErrorBlock message={'Items not found'} />
      )
    }

    if(data) {
      return (
        <TrackingItemsList items={data.result} />
      )
    }
  }

  return (
    <div>
      <Head>
        <title>
          ParcelLab fullstack challenge
        </title>
        <meta
          name="description"
          content="ParcelLab fullstack challenge"
        />
      </Head>
      <main>
        <div className="flex flex-col sm:items-center gap-2 m-2 p-2">
          <h1 className="text-2xl">
            Your orders
          </h1>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

Home.requireAuth = true

export default Home
