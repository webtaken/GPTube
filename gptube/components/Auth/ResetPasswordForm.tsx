import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Form, Input } from "antd";
import { useRouter } from "next/router";
import { openSans } from "@/components/Common/Fonts";
import { toast, Toaster } from "react-hot-toast";
import { FirebaseError } from "firebase/app";

const ResetPasswordForm: React.FC = () => {
  const { resetPassword } = useAuth();

  const onFinishHandler = async ({ email }: { email: string }) => {
    try {
      await resetPassword(email);
      toast.success("Reset email sent.");
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <Form
      name="reset_password_form"
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

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <button className="primary-button p-2 mx-auto">
          <span className={`${openSans.className}`}>Send Email</span>
        </button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
