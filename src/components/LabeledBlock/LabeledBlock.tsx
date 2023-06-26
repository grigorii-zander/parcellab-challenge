export const LabeledBlock: FC<{ label: string }, true> = ({ children, label }) => {
  return (
    <div className='flex flex-col gap'>
      <div className='text-xs'>
        {label}
      </div>
      <div className='break-words'>
        {children}
      </div>
    </div>
  )
}
