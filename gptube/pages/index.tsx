import Service from "@/components/Service/Service";
import Link from "next/link";
import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";

import YoutubeEmbed from "@/components/UI/YoutubeEmbed";

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
          </p>
          <div className="flex justify-center w-full">
            <Link href="/youtube" className="primary-button p-2">
              Try GPTube
            </Link>
          </div>
        </div>
        <YoutubeEmbed title="GPTube demo" embedId="-PFT1hEgxGY" />
      </section>
      <Service />
    </div>
  );
};

export default Home;
Home.Layout = "Admin";
