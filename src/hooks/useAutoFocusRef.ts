import { useEffect, useRef } from 'react'

export const useAutoFocusRef = () => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = ref.current
    if (input) {
      input.focus()
    }
  })

  return ref
}
