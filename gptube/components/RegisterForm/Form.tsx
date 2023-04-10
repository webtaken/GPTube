import { Form, Input, Button, Checkbox } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { toast, Toaster } from "react-hot-toast";

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string }) => {
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Error sending the data");
      }
      toast.success("Email registered successfully");
      form.resetFields();
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <div className="h-full p-12">
      <Toaster />
      <p className="mb-6 text-xl">
        Send us your email and we will send you updates for next features
      </p>
      <Form
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: "500px" }}
        name="register"
        autoComplete="off"
      >
        <Form.Item
          className="my-4"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button size="large" htmlType="submit" className="flex">
            <SendOutlined className="my-auto " />
            Contact us
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
