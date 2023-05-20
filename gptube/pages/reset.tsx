import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import Link from "next/link";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";

const Reset: MyPage = () => {
  return (
    <div className={`${openSans.className}`}>
      <h1 className={`${openSans.className} text-typo text-center text-4xl`}>
        <Link href="/" className="font-bold hover:text-primary">
          GPTube
        </Link>{" "}
        reset password
      </h1>
      <div className="flex mt-10">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default Reset;
Reset.Layout = "Auth";
