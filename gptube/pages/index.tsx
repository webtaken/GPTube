import Image from "next/image";
import Service from "@/components/Service/Service";
import Link from "next/link";
import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";

import HappyNews from "@/assets/icons/happy_news.svg";

const Home: MyPage = () => {
  return (
    <div className={`gap-2 my-20 ${openSans.className}`}>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 opacity-1">
        <div className="grid grid-cols-1 gap-8 my-auto mx-16">
          <p className="text-lg md:text-4xl text-typo text-center">
            Check what people think about your content
          </p>
          <p className="text-xs md:text-lg text-white text-justify">
            Powered by AI technology, with{" "}
            <span className="font-bold">GPTube</span> you can analyze in a easy
            way what people think about your social media content in various
            platforms such as{" "}
            <span className="font-bold">
              Youtube, TikTok, Instagram, Facebook, etc...
            </span>
            .
          </p>
          <div className="flex justify-center w-full">
            <Link
              href="/youtube"
              // className="px-4 py-2 text-base bg-primary border-2 border-primary font-medium text-typo hover:text-primary order-last hover:bg-white rounded-lg"
              className="primary-button"
            >
              Try GPTube
            </Link>
          </div>
        </div>
        <Image
          className="h-64 w-64 md:h-72 md:w-72 lg:w-80 lg:h-80 my-auto mx-auto"
          src={HappyNews}
          alt="Analysis Report"
        />
      </section>
      <Service />
    </div>
  );
};

export default Home;
Home.Layout = "Admin";
