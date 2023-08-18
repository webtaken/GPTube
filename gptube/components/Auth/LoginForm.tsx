import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import { FirebaseError } from "firebase/app";
import { toast, Toaster } from "react-hot-toast";

import { useAuth } from "@/context/AuthContext/AuthContext";
import Google from "@/assets/icons/Google";
import { openSans } from "@/components/Common/Fonts";

const LoginForm: React.FC = () => {
  const { login, signup, loginGoogle } = useAuth();
  const router = useRouter();
  const { from } = router.query;

  const redirection = () => {
    if (from && !Array.isArray(from)) router.push(from);
    else router.push("/");
  };

  const onFinishHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await login(email, password);
      toast.success("logged in 😸");
      redirection();
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          try {
            await signup(email, password);
            redirection();
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

  const loginWithGoogleHandler = async () => {
    try {
      await loginGoogle();
      toast.success("logged in 😸");
      redirection();
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <Fragment>
      <div className="flex items-center">
        <Button
          icon={<Google className="w-4 h-4 mx-auto" />}
          className="primary-button bg-white mx-auto gap-2"
          onClick={loginWithGoogleHandler}
        >
          Google
        </Button>
      </div>
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
    </Fragment>
  );
};

export default LoginForm;
