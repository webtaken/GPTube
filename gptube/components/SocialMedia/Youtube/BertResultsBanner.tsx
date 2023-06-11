import { Layout } from "antd";
import { openSans } from "@/components/Common/Fonts";

const { Content } = Layout;

interface BertResultsBannerProps {
  score_1: number;
  score_2: number;
  score_3: number;
  score_4: number;
  score_5: number;
  success_count: number;
  errors_count: number;
}

const BertResultsBanner: React.FC<BertResultsBannerProps> = ({
  score_1,
  score_2,
  score_3,
  score_4,
  score_5,
  success_count,
  errors_count,
}) => {
  const percentageHandler = (votes: number) => {
    if (success_count === 0) return 0;
    return 100 * (votes / success_count);
  };
  return (
    <Content
      className={`${openSans.className} max-w-full bg-black-medium mx-20 rounded-md text-typo`}
    >
      <p className="pt-4 text-center text-lg font-semibold">
        Satisfaction by Rates <span className="font-bold">(BERT)</span> ⭐
      </p>

      <div className="border-2 border-white my-4 rounded-md">
        <p className="text-base text-center mt-2">Votes</p>
        <div className="grid grid-cols-1 space-y-2 my-2 pb-2">
          <div className="flex justify-center items-center gap-x-4 mx-4">
            <p className="col-span-1 text-base">😃</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#57FF1C] h-2.5 rounded-full"
                style={{
                  width: `${percentageHandler(score_5)}%`,
                }}
              />
              <p className="col-span-1 text-sm text-center">
                {score_5}/{success_count}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-4 mx-4">
            <p className="col-span-1 text-base">🙂</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#57FF1C] h-2.5 rounded-full"
                style={{
                  width: `${percentageHandler(score_4)}%`,
                }}
              />
              <p className="col-span-1 text-sm text-center">
                {score_4}/{success_count}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-4 mx-4">
            <p className="col-span-1 text-base">😐</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#57FF1C] h-2.5 rounded-full"
                style={{
                  width: `${percentageHandler(score_3)}%`,
                }}
              />
              <p className="col-span-1 text-sm text-center">
                {score_3}/{success_count}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-4 mx-4">
            <p className="col-span-1 text-base">😑</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#57FF1C] h-2.5 rounded-full"
                style={{
                  width: `${percentageHandler(score_2)}%`,
                }}
              />
              <p className="col-span-1 text-sm text-center">
                {score_2}/{success_count}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-4 mx-4">
            <p className="col-span-1 text-base">😠</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#57FF1C] h-2.5 rounded-full"
                style={{
                  width: `${percentageHandler(score_1)}%`,
                }}
              />
              <p className="col-span-1 text-sm text-center">
                {score_1}/{success_count}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black-full rounded-md">
        <div className="grid grid-cols-5 place-content-evenly">
          <div className="m-4 text-xl">
            <p className="text-center">
              😠
              <br />
              <span className="text-base">1</span>
            </p>
          </div>
          <div className="m-4 text-xl">
            <p className="text-center">
              😑
              <br />
              <span className="text-base">2</span>
            </p>
          </div>
          <div className="m-4 text-xl">
            <p className="text-center">
              😐
              <br />
              <span className="text-base">3</span>
            </p>
          </div>
          <div className="m-4 text-xl">
            <p className="text-center">
              🙂
              <br />
              <span className="text-base">4</span>
            </p>
          </div>
          <div className="m-4 text-xl">
            <p className="text-center">
              😃
              <br />
              <span className="text-base">5</span>
            </p>
          </div>
        </div>
      </div>
      <div className="my-8">
        <p className="text-justify text-base">
          BERT is our rate model that ranks the overall satisfaction of your
          users in a scale from 1 to 5, where 5 is an excellent opinion of your
          content and 1 is a bad opinion.
        </p>
        {errors_count !== 0 && (
          <p className="text-center text-base">
            Sorry 😵 We couldn't process{" "}
            <span className="text-red-500 font-bold">
              {errors_count} comments
            </span>{" "}
            🚫
          </p>
        )}
      </div>
    </Content>
  );
};

export default BertResultsBanner;
