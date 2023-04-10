import About from "@/components/About/About";
import Layout from "@/components/Layout";
import RegisterForm from "@/components/RegisterForm/Form";
import Service from "@/components/Service/Service";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        id="head"
        className="home grid grid-cols-1 md:grid-cols-2 gap-8 p-8 h-[80vh]"
      >
        <div className="space-y-4 my-auto mx-16">
          <p className="text-4xl text-[#006FFF] text-center mx-14">
            Check what people think about your content
          </p>
          <p className="text-xl text-justify py-4">
            Powered by AI technology, with GPTube you can analyze in a easy way
            what people think about your social media content in various content
            platforms such as <span className="font-bold">Youtube, Tiktok, Facebook, Instagram, etc</span>.
          </p>
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Try GPTube
            </Link>
          </div>
        </div>
        <div className="bg-black opacity-25 rounded-lg my-auto">Video</div>
      </div>
      <section id="about" className="h-full bg-gray-100">
        <About />
      </section>
      <section id="service" className="">
        <Service />
      </section>
      <section id="register" className="bg-gray-50">
        <RegisterForm />
      </section>
    </>
  );
}
