import { useState } from 'react'
import { useAutoFocusRef } from '~/hooks/useAutoFocusRef'

export const LoginForm: FC<{
  onSubmit: (email: string) => void
}> = ({ onSubmit }) => {
  const [email, setEmail] = useState('')

  const inputRef = useAutoFocusRef()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email)
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white dark:bg-neutral-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Please enter your email address to see your recent orders
          </h2>
          <div className="mt-2">
            <form
              className="mt-2 space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>
                <input
                  ref={inputRef}
                  className="mt-1 w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-gray-800 dark:bg-black dark:border-gray-700 dark:focus:border-gray-400"
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  placeholder="user@email.com"
                  onChange={handleEmailChange}
                />
              </div>
              <button
                className="h-8 px-6 text-xs w-full font-bold text-white bg-black hover:bg-transparent hover:text-gray-800 border-black dark:bg-white dark:hover:bg-neutral-900 dark:hover:border-white dark:text-gray-800 border dark:hover:text-white"
                type={'submit'}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
