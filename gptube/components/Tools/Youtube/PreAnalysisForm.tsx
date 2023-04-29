import { Dispatch, SetStateAction } from "react";
import { extractYTVideoID } from "@/utils";
import { openSans } from "../../Common/Fonts";
import { toast, Toaster } from "react-hot-toast";
import { Form, Input } from "antd";

interface PreAnalysisFormProps {
  setVideoTitle: Dispatch<SetStateAction<string>>;
  setImageURL: Dispatch<SetStateAction<string>>;
  setTags: Dispatch<SetStateAction<string[]>>;
  setRequiresEmail: Dispatch<SetStateAction<boolean>>;
  setNumberOfComments: Dispatch<SetStateAction<number>>;
}

const PreAnalysisForm: React.FC<PreAnalysisFormProps> = ({
  setVideoTitle,
  setImageURL,
  setTags,
  setRequiresEmail,
  setNumberOfComments,
}) => {
  const onFinishHandler = async ({ url }: { url: string }) => {
    const videoID = extractYTVideoID(url);
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/YT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_id: videoID }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to send data.");
      }
      console.log(data);
      setVideoTitle(data.snippet.title);
      setImageURL(data.snippet.thumbnails.standard.url);
      setTags(data.snippet.tags);
      setRequiresEmail(data.requires_email ?? false);
      setNumberOfComments(data.number_of_comments);
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <Form
      name="analysis_form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinishHandler}
      className="mx-auto"
    >
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
            type: "url",
            message: "Please input a valid Youtube URL Video.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
        <button className="px-4 mx-auto text-sm md:text-base w-full h-10 bg-primary border-2 border-primary font-medium text-typo hover:text-primary order-last hover:bg-white rounded-lg">
          <span className={`${openSans.className}`}>Start</span>
        </button>
      </Form.Item>
    </Form>
  );
};

export default PreAnalysisForm;