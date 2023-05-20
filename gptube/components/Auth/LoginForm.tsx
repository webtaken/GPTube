import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Form, Input } from "antd";
import { useRouter } from "next/router";
import { openSans } from "@/components/Common/Fonts";
import { toast, Toaster } from "react-hot-toast";
import { FirebaseError } from "firebase/app";

const LoginForm: React.FC = () => {
  const { login, signup } = useAuth();
  const router = useRouter();

  const onFinishHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await login(email, password);
      router.push("/youtube");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          try {
            await signup(email, password);
            router.push("/youtube");
          } catch (error) {
            toast.error(String(error));
          }
          return;
        }
        toast.error(String(error.message));
      } else {
        toast.error(String(error));
      }
    }
  };

  return (
    <Form
      name="login_form"
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
            message: "Please input your email!",
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
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Link href="/reset">
          <span
            className={`text-primary hover:text-white underline ${openSans.className}`}
          >
            Forgot your password?
          </span>
        </Link>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <button className="primary-button py-2 px-4 mx-auto">
          <span className={`${openSans.className}`}>Login</span>
        </button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
