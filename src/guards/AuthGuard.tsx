import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

const defaultContextValue = {
  email: '',
  setEmail: (_email: string) => {},
  setFrom: (_path: string) => {},
}

export const Context = React.createContext(defaultContextValue)

export const AuthGuardProvider: FC<true> = ({ children }) => {
  const router = useRouter()
  const [state, setState] = useState({ email: '' })
  const mutableStateRef = useRef({ from: '/' })

  const setEmail = useCallback((email: string) => {
    setState(state => ({
      ...state,
      email,
    }))
    router.replace(mutableStateRef.current.from)
  }, [router])

  const setFrom = useCallback((path: string) => {
    mutableStateRef.current.from = path
  }, [])

  const providerValueRef = useRef(defaultContextValue)
  providerValueRef.current.email = state.email
  providerValueRef.current.setEmail = setEmail
  providerValueRef.current.setFrom = setFrom

  return (
    <Context.Provider value={providerValueRef.current}>
      {children}
    </Context.Provider>
  )

}

export const AuthGuard: FC<true> = ({ children }) => {
  const context = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    const fromPath = router.asPath.startsWith('/auth') ? '/' : router.asPath
    if(!context.email && !router.asPath.startsWith('/auth')) {
      context.setFrom(fromPath)
      router.replace('/auth')
    }
  }, [router, context])


  if(!context.email) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}
