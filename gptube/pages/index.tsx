import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-6">
      <div className="col-span-1 space-y-4">
        <p className="text-4xl text-[#006FFF] text-center">
          Check what people think about your content
        </p>
        <p className="text-xl text-justify">
          Powered by AI technology, with GPTube you can analyze in a easy way
          what people think about your social media content in various content
          platforms such as Youtube, Tiktok, Facebook, Instagram, etc.
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
      <div className="col-span-1 bg-black opacity-25 rounded-lg">
        <p>Video</p>
      </div>
    </div>
  );
}
