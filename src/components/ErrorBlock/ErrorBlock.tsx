import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export const ErrorBlock: FC<{ message: string, children?: JSX.Element }> = ({ message, children }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2 text-red-600 items-center'>
        <ExclamationCircleIcon className='w-4' />
        <span>
          {message}
        </span>
      </div>
      {children ? (
        <div>
          {children}
        </div>
      ) : null}
    </div>
  )
}
