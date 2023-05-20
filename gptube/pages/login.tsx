import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";

const Login: MyPage = () => {
  return (
    <div className={`${openSans.className}`}>
      <h1 className={`${openSans.className} text-typo text-center text-4xl`}>
        <Link href="/" className="font-bold hover:text-primary">
          GPTube
        </Link>{" "}
        Login
      </h1>
      <div className="mt-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
Login.Layout = "Auth";
