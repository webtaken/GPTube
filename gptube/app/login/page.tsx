'use client'

import { Card, CardHeader, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'

import { Button } from '@/components/Common/button'
import { GoogleIcon } from '@/assets/icons/google-icon'

export default function Login() {
  return (
    <main className="w-[100dvw] h-[100dvh] flex justify-center items-center">
      <Card className="max-w-sm w-full py-8 " radius="sm">
        <CardHeader className="text-center flex flex-col items-center gap-2">
          <h2 className="text-xl font-medium ">Create your GPtube account</h2>
          <span className="text-neutral-600">Get started for free</span>
        </CardHeader>
        <Divider />
        <CardFooter>
          <Button
            className="bg-white border-2 hover:border-neutral-800 text-medium mx-auto"
            radius="sm"
            startContent={<GoogleIcon className="w-5 h-5" />}
            variant="solid"
          >
            Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
