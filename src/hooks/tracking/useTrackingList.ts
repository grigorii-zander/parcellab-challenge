
import useSWR from 'swr'
import { GetResponse } from 'src/app/api/tracking/[email]/route'
import { BaseError } from '~/core/http'

export const useTrackingList = (email: string, opts?: {
  cursor?: string,
  take: number
  checkpoints: number,
}) => {
  return useSWR<GetResponse, BaseError>(`/api/tracking/${email}?checkpoints=${opts?.checkpoints ?? 3}`)
}
