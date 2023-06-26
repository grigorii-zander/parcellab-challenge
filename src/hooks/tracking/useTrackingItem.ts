
import useSWR from 'swr'
import { GetResponse } from 'src/app/api/tracking/item/[trackingNumber]/route'

export const useTrackingItem = (trackingNumber: string, _opts?: {
  checkpoints: number,
}) => {
  return useSWR<GetResponse>(`/api/tracking/item/${trackingNumber}?checkpoints=100`)
}
