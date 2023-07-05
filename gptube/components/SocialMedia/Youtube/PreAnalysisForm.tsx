import { Dispatch, SetStateAction } from "react";
import { extractYTVideoID } from "@/utils";
import { openSans } from "../../Common/Fonts";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Form, Input, Button } from "antd";

interface PreAnalysisFormProps {
  setVideoID: Dispatch<SetStateAction<string>>;
  setVideoTitle: Dispatch<SetStateAction<string>>;
  setImageURL: Dispatch<SetStateAction<string>>;
  setTags: Dispatch<SetStateAction<string[]>>;
  setRequiresEmail: Dispatch<SetStateAction<boolean>>;
  setNumberOfComments: Dispatch<SetStateAction<number>>;
}

const PreAnalysisForm: React.FC<PreAnalysisFormProps> = ({
  setVideoID,
  setVideoTitle,
  setImageURL,
  setTags,
  setRequiresEmail,
  setNumberOfComments,
}) => {
  const { user } = useAuth();

  const usageLimitReached = async () => {
    try {
      const userEmail = user?.email || "";
      const response = await fetch(
        "/api/usage-limit-youtube?" +
          new URLSearchParams({
            ownerEmail: userEmail,
          })
      );
      const data = await response.json();
      return data.usage_limit_reached;
    } catch (error) {
      throw error;
    }
  };

  const onFinishHandler = async ({ url }: { url: string }) => {
    const videoID = extractYTVideoID(url);
    try {
      const usageLimit = await usageLimitReached();
      if (usageLimit === true) {
        throw new Error(
          "Usage limit reached!, please contact @node_srojas1 on twitter with the hashtag #gptube"
        );
      }

      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/youtube/pre-analysis`,
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
        throw new Error(`${data?.error || "Failed to send data"}. Please try again later.`);
      }
      setVideoID(data.video_id);
      setVideoTitle(data.snippet.title);
      setImageURL(data.snippet.thumbnails.standard.url);
      setTags(data.snippet.tags);
      setRequiresEmail(data.requires_email ?? false);
      setNumberOfComments(data.number_of_comments);
    } catch (error) {
      toast.error(`${String(error)}`);
    }
  };

  return (
    <Form
      name="pre-analysis_form"
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
        <Input className="border-none" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
        <Button className="primary-button w-full" htmlType="submit">
          <span className={`${openSans.className}`}>Start</span>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PreAnalysisForm;
