
// https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/svg-css/blocks-shuffle-3.svg
import spinnerSVG from './spinner.svg'
import Image from 'next/image'

export const Spinner: FC = () => {
  return (
    <Image
      src={spinnerSVG}
      alt={'Loading...'}
    />
  )
}
