import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import Link from "next/link";

const Thanks: MyPage = () => {
  return (
    <div className={`${openSans.className}`}>
      <p className="text-center text-typo mt-2 text-3xl">
        Thanks for choosing GPTube 😸!
      </p>
      <div className="flex mt-2">
        <Link
          href="/"
          className="mx-auto bg-black-medium hover:bg-black-full hover:border hover:border-white-full font-bold text-typo btn"
        >
          Go to GPTube
        </Link>
      </div>
    </div>
  );
};

export default Thanks;
Thanks.Layout = "Auth";
