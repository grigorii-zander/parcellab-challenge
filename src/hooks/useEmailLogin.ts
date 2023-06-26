import { useContext } from 'react'
import { Context } from '~/guards/AuthGuard'


export const useEmailLogin = () => {
  const context = useContext(Context)
  return context.setEmail
}
