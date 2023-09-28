import Link from 'next/link'

import LoginForm from '@/components/Auth/LoginForm'
import { LayoutsAvailable } from '@/components/Layouts/map-layouts'

function Login() {
  return (
    <div className="">
      <h1 className={` text-typo text-center text-4xl`}>
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
