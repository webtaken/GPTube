import { useAuth } from "@/context/AuthContext";
import { Form, Input } from "antd";
import { useRouter } from "next/router";
import { openSans } from "@/components/Common/Fonts";
import { toast, Toaster } from "react-hot-toast";

const SignUpForm: React.FC = () => {
  const { signup } = useAuth();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinishHandler = async ({
    email,
    password,
    repeat_password,
  }: {
    email: string;
    password: string;
    repeat_password: string;
  }) => {
    if (password !== repeat_password) {
      form.setFields([
        {
          name: "repeat_password",
          errors: ["Both passwords must be equal!"],
        },
      ]);
      return;
    }
    try {
      await signup(email, password);
      router.push("/youtube");
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <Form
      name="sign_up_form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinishHandler}
      autoComplete="off"
      className="w-96 mx-auto"
    >
      <Toaster />
      <Form.Item
        label={<p className={`text-typo ${openSans.className}`}>E-mail</p>}
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input a valid email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<p className={`text-typo ${openSans.className}`}>Password</p>}
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password className="border-none" />
      </Form.Item>

      <Form.Item
        label={
          <p className={`text-typo ${openSans.className}`}>Repeat password</p>
        }
        name="repeat_password"
        rules={[{ required: true, message: "Please repeat your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <button className="px-4 mt-2 text-base w-full h-9 bg-primary border-2 border-primary font-medium text-typo hover:text-primary order-last hover:bg-primary-low rounded-lg">
          <span className={`${openSans.className}`}>SignUp</span>
        </button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
