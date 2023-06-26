import { useContext } from 'react'
import { Context } from '~/guards/AuthGuard'

// Lets imagine this is a real session
export const useUserSession = () => {
  const context = useContext(Context)
  return {
    email: context.email,
  }
}
