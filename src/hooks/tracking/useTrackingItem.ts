
import useSWR from 'swr'
import { GetResponse } from 'src/app/api/tracking/item/[trackingNumber]/route'
import { BaseError } from '~/core/http'

export const useTrackingItem = (trackingNumber: string, opts?: {
  checkpoints: number,
}) => {
  return useSWR<GetResponse, BaseError>(`/api/tracking/item/${trackingNumber}?checkpoints=${opts?.checkpoints ?? 100}`)
}
