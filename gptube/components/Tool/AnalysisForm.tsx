import { useState } from "react";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import { extractYTVideoID } from "@/utils";
import { openSans } from "../Common/Fonts";
import { toast, Toaster } from "react-hot-toast";
import { Button, Form, Input } from "antd";

const AnalysisForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [videoURL, setVideoURL] = useState<string>("");
  const router = useRouter();

  const submitVideoHandler = async (e: FormEvent) => {
    e.preventDefault();
    const videoID = extractYTVideoID(videoURL);
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/YT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_id: videoID, email: email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error("Failed to send data.");
      }
      router.push("/confirmation");
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <>
      {/* <Form name="analysis_form" onFinish={onFinishHandler}>
        <Toaster />
        <Form.Item
          label={
            <p className={`text-typo ${openSans.className}`}>
              URL Youtube video:
            </p>
          }
          name="url"
          rules={[
            {
              required: true,
              type: "u",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form> */}
      <form onSubmit={submitVideoHandler}>
        <div className="mb-6">
          <label
            htmlFor="yt-url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            URL Youtube video:
          </label>
          <input
            type="text"
            id="yt-url"
            name="videoURL"
            placeholder="https://youtu.be/yBHA62SSJ0w"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="somebody@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="text-white bg-blue-700 font-medium text-sm"
          >
            Analyze video
          </Button>
        </div>
      </form>
    </>
  );
};

export default AnalysisForm;
