import Link from "next/link";
import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import SignUpForm from "@/components/Auth/SignUpForm";

const SignUp: MyPage = () => {
  return (
    <div className={`${openSans.className}`}>
      <h1 className={`${openSans.className} text-typo text-center text-4xl`}>
        <Link href="/" className="font-bold hover:text-primary">
          GPTube
        </Link>{" "}
        SignUp
      </h1>
      <div className="flex mt-10">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
SignUp.Layout = "Auth";
