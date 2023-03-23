import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-8 m-6">
        <div className="space-y-4">
          <p className="text-4xl text-[#006FFF] text-center">
            Check what people think about your content
          </p>
          <p className="text-xl text-justify">
            Powered by AI technology, with GPTube you can analyze in a easy way
            what people think about your social media content in various content
            platforms such as Youtube, Tiktok, Facebook, Instagram, etc.
          </p>
          <div className="flex justify-center">
            <button className="bg-[#006FFF] hover:bg-blue-700 text-white py-2 px-4 rounded w-48 h-16">
              <span className="text-lg">Try GPTube</span>
            </button>
          </div>
        </div>
        <div className="bg-black opacity-25 rounded-lg"></div>
      </div>
    </Layout>
  );
}
