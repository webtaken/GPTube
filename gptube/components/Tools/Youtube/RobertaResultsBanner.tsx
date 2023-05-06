import { Layout } from "antd";
import { openSans } from "@/components/Common/Fonts";

const { Content } = Layout;

interface RobertaResultsBannerProps {
  positive: number;
  negative: number;
  neutral: number;
  success_count: number;
  errors_count: number;
}

const RobertaResultsBanner: React.FC<RobertaResultsBannerProps> = ({
  positive,
  negative,
  neutral,
  success_count,
  errors_count,
}) => {
  let textHelper: JSX.Element = (
    <span>
      From <span className="font-bold">{success_count}</span> comments, your
      video has a major positive impact, good job ✅
    </span>
  );
  if (neutral > negative && neutral > positive) {
    textHelper = (
      <span>
        From <span className="font-bold">{success_count}</span> comments, your
        video has a major neutral impact, keep going 👍
      </span>
    );
  }
  if (negative > positive && negative > neutral) {
    textHelper = (
      <span>
        From <span className="font-bold">{success_count}</span> comments, your
        video has a major negative impact, don't give up 🤙
      </span>
    );
  }

  const percentageHandler = (percentage: number) => {
    return (100 * percentage).toFixed(2);
  };
  return (
    <Content
      className={`${openSans.className} bg-black-medium mt-6 mx-20 rounded-md text-typo`}
    >
      <p className="p-4 text-center text-lg font-semibold">Sentiment Analysis ⭐🤗</p>
      <div className="grid grid-cols-1 mt-8">
        <div className="col-span-1 m-auto">
          <div className="bg-black-full mx-40 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 place-content-evenly">
              <div className="m-4 text-xl">
                <p className="text-center">
                  {percentageHandler(negative)}%
                  <br />
                  😠
                  <br />
                  <span className="text-base">Negative</span>
                </p>
              </div>
              <div className="m-4 text-xl">
                <p className="text-center">
                  {percentageHandler(neutral)}%
                  <br />
                  😐
                  <br />
                  <span className="text-base">Neutral</span>
                </p>
              </div>
              <div className="m-4 text-xl">
                <p className="text-center">
                  {percentageHandler(positive)}%
                  <br />
                  😃
                  <br />
                  <span className="text-base">Positive</span>
                </p>
              </div>
            </div>
          </div>
          <div className="m-8">
            <p className="text-center text-base">
              RoBERTa model ranks the sentiment of the comments, this is the
              average perception about your video. <br />
              {textHelper}
            </p>
            {errors_count !== 0 && (
              <p className="text-center text-base">
                Some comments couldn't be processed 😵{" "}
                <span className="text-red-500 font-bold">
                  {errors_count} comments
                </span>{" "}
                🚫
              </p>
            )}
          </div>
        </div>
      </div>
    </Content>
  );
};

export default RobertaResultsBanner;
