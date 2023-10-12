'use client'

import { Card, CardHeader, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import Link from 'next/link'
import { LogIn } from 'lucide-react'

import { Button } from '@/components/Common/button'
import { GoogleIcon } from '@/assets/icons/google-icon'
import { Input } from '@/components/Common/input'
import { useAuthActions } from '@/hooks/use-auth'

export default function Register() {
  const { loginWithGoogleHandler, signupHandler } = useAuthActions()

  return (
    <main className="w-[100dvw] h-[100dvh] flex justify-center items-center">
      <Card className="w-full max-w-md py-8" radius="sm">
        <CardHeader className="flex flex-col items-center gap-2 p-5 text-center">
          <h2 className="text-lg font-medium ">Create your GPTube account</h2>
          <small className="text-neutral-500">Get started for free</small>
        </CardHeader>
        <Divider />
        <CardFooter className="flex flex-col items-center max-w-sm gap-4 p-5 mx-auto">
          <form className="flex flex-col w-full gap-4" onSubmit={signupHandler}>
            <Input
              isRequired
              required
              label="Email"
              name="email"
              type="email"
              variant="underlined"
            />
            <Input
              isRequired
              required
              label="Password"
              name="password"
              type="password"
              variant="underlined"
            />
            <Button
              fullWidth
              className="mx-auto font-medium bg-white border-2 hover:border-neutral-800"
              radius="sm"
              startContent={<LogIn className="w-5 h-5" />}
              type="submit"
              variant="solid"
            >
              Sign in
            </Button>
          </form>
          <span>or</span>
          <Button
            fullWidth
            className="mx-auto font-medium bg-white border-2 hover:border-neutral-800"
            radius="sm"
            startContent={<GoogleIcon className="w-5 h-5" />}
            variant="solid"
            onClick={loginWithGoogleHandler}
          >
            Continue with Google
          </Button>
          <small className="text-neutral-500">
            Already have an account?{' '}
            <Link className="font-semibold hover:underline" href="/login">
              Sign in.
            </Link>
          </small>
        </CardFooter>
      </Card>
    </main>
  )
}
