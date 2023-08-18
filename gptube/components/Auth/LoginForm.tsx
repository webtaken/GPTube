import Link from 'next/link'
import { Form, Input, Button } from 'antd'
import { Toaster } from 'react-hot-toast'

import Google from '@/assets/icons/Google'
import { openSans } from '@/components/Common/Fonts'
import { useAuth } from '@/hooks/useAuth'

function LoginForm() {
  const { login, loginWithGoogleHandler } = useAuth()

  return (
    <>
      <div className="flex items-center">
        <Button
          className="gap-2 mx-auto bg-white primary-button"
          icon={<Google className="w-4 h-4 mx-auto" />}
          onClick={loginWithGoogleHandler}
        >
          Google
        </Button>
      </div>
      <Form
        autoComplete="off"
        className="mx-auto w-96"
        labelCol={{ span: 24 }}
        name="login_form"
        wrapperCol={{ span: 24 }}
        onFinish={login}
      >
        <Toaster />
        <Form.Item
          label={<p className={`text-typo ${openSans.className}`}>E-mail</p>}
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<p className={`text-typo ${openSans.className}`}>Password</p>}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Link href="/reset">
            <span className={`text-primary hover:text-white underline ${openSans.className}`}>
              Forgot your password?
            </span>
          </Link>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <button className="px-4 py-2 mx-auto primary-button" type="submit">
            <span className={`${openSans.className}`}>Login</span>
          </button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
