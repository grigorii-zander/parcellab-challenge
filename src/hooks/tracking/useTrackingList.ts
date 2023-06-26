
import useSWR from 'swr'
import { GetResponse } from 'src/app/api/tracking/[email]/route'

export const useTrackingList = (email: string, _opts?: {
  cursor?: string,
  take: number
  checkpoints: number,
}) => {
  return useSWR<GetResponse>(`/api/tracking/${email}?checkpoints=3`)
}
