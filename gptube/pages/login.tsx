import Link from 'next/link'

import { openSans } from '@/components/Common/Fonts'
import LoginForm from '@/components/Auth/LoginForm'
import { LayoutsAvailable } from '@/components/Layouts/Layouts'

function Login() {
  return (
    <div className={`${openSans.className}`}>
      <h1 className={`${openSans.className} text-typo text-center text-4xl`}>
        <Link className="font-bold hover:text-primary" href="/">
          GPTube
        </Link>{' '}
        Login
      </h1>
      <div className="mt-10">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
Login.Layout = LayoutsAvailable.Auth
