import Image from "next/image";
import About from "@/components/About/About";
import RegisterForm from "@/components/RegisterForm/Form";
import Service from "@/components/Service/Service";
import Link from "next/link";

import analysis from "@/assets/img/analysis-report.png";

export default function Home() {
    return (
        <div className="">
            <section className="grid grid-cols-2 px-10 bg-black-medium">
                <div className="grid gap-8 my-auto mx-20">    
                    <p className="text-4xl text-blue-600">
                        Check what people think about your content
                    </p>
                    <p className="text-white text-lg">
                        Powered by AI technology, with GPTube you can analyze in a easy way
                        what people think about your social media content in various content
                        platforms such as <span className="font-bold">Youtube, Tiktok, Facebook, Instagram, etc</span>.
                    </p>
                    <div className="flex justify-center">
                        <Link
                        href="/dashboard"
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Try GPTube
                        </Link>
                    </div>
                </div>
                <Image
                    className="rounded-3xl my-auto"
                    src={analysis}
                    width={550}
                    alt="Analysis Report"
                />
            </section>
            <section id="about" className="bg-gray-100">
                <About />
            </section>
            <section id="service" className="">
                <Service />
            </section>
            <section id="register" className="bg-gray-50">
                <RegisterForm />
            </section>
        </div>
    );
}
