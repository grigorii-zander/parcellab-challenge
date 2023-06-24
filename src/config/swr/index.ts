import { fetcher } from '~/lib/client/fetcher'

export function swrConfig() {
  const handleError = (err: Error) => {
    throw err
  }

  return {
    fetcher,
    onError: handleError,
  }
}
