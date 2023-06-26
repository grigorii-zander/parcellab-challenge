import Head from 'next/head'
import { AuthLayout } from '~/layouts/AuthLayout'
import { LoginForm } from '~/components/LoginForm/LoginForm'
import { useEmailLogin } from '~/hooks/useEmailLogin'

const Auth: FC = () => {
  const login = useEmailLogin()

  return (
    <div className="h-screen">
      <Head>
        <title>
          ParcelLab fullstack challenge
        </title>
        <meta
          name="description"
          content="ParcelLab fullstack challenge"
        />
      </Head>
      <main>
        <AuthLayout>
          <div className="mt-10">
            <LoginForm onSubmit={login}/>
          </div>
        </AuthLayout>
      </main>
    </div>
  )
}

export default Auth
