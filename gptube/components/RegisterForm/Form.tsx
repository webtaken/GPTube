import { Form, Input, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { toast, Toaster } from 'react-hot-toast'

import { ENV_CONFIG } from '@/config/env-config'

function RegisterForm() {
  const [form] = Form.useForm()

  const onFinish = async (values: { email: string }) => {
    // TODO: This is a api endpoint
    try {
      const response = await fetch(`${ENV_CONFIG.backend.url ?? ''}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      })

      if (!response.ok) {
        toast.error('Error sending the data')

        return
      }
      toast.success('Email registered successfully')
      form.resetFields()
    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    <div className="h-full p-12">
      <Toaster />
      <p className="mb-6 text-xl">
        Send us your email and we will send you updates for next features
      </p>
      <Form
        autoComplete="off"
        form={form}
        name="register"
        style={{ maxWidth: '500px' }}
        onFinish={onFinish}
      >
        <Form.Item
          className="my-4"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input a valid Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="flex" htmlType="submit" size="large">
            <SendOutlined className="my-auto " rev={undefined} />
            Contact us
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterForm
