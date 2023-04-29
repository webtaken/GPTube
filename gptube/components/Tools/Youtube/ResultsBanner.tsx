interface ResultsBannerProps {
  votes_1: number;
  votes_2: number;
  votes_3: number;
  votes_4: number;
  votes_5: number;
  total_count: number;
  errors_count: number;
}

const ResultsBanner: React.FC<ResultsBannerProps> = ({
  votes_1,
  votes_2,
  votes_3,
  votes_4,
  votes_5,
  total_count,
  errors_count,
}) => {
  const percentageHandler = (votes: number) => {
    if (total_count === 0) return 0;
    return 100 * (votes / total_count);
  };

  return (
    <div className="bg-[#FFF8F8] m-4 rounded-md">
      <p className="p-4 text-center text-lg text-[#006FFF]">
        Satisfaction by Rates ⭐
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 m-auto">
          <div className="bg-white mx-24 border-2 border-black rounded-md">
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
          <div className="m-8">
            <p className="text-justify text-[#006FFF] text-base">
              Our rate AI model ranks the overall satisfaction of your users in
              a scale from 1 to 5, where 5 is an excellent opinion of your
              content and 1 is a bad opinion from a user.
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
        </div>
        <div className="col-span-1">
          <div className="border-2 border-black mx-10 my-4 rounded-md">
            <p className="text-base text-center">Votes</p>
            <div className="grid grid-cols-1 space-y-4 my-8">
              <div className="flex justify-center items-center space-x-8 mx-4">
                <p className="col-span-1 text-base">😃</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-[#57FF1C] h-2.5 rounded-full"
                    style={{
                      width: `${percentageHandler(votes_5)}%`,
                    }}
                  ></div>
                </div>
                <p className="col-span-1 text-sm">
                  {votes_5}/{total_count}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-8 mx-4">
                <p className="col-span-1 text-base">🙂</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-[#57FF1C] h-2.5 rounded-full"
                    style={{
                      width: `${percentageHandler(votes_4)}%`,
                    }}
                  ></div>
                </div>
                <p className="col-span-1 text-sm">
                  {votes_4}/{total_count}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-8 mx-4">
                <p className="col-span-1 text-base">😐</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-[#57FF1C] h-2.5 rounded-full"
                    style={{
                      width: `${percentageHandler(votes_3)}%`,
                    }}
                  ></div>
                </div>
                <p className="col-span-1 text-sm">
                  {votes_3}/{total_count}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-8 mx-4">
                <p className="col-span-1 text-base">😑</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-[#57FF1C] h-2.5 rounded-full"
                    style={{
                      width: `${percentageHandler(votes_2)}%`,
                    }}
                  ></div>
                </div>
                <p className="col-span-1 text-sm">
                  {votes_2}/{total_count}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-8 mx-4">
                <p className="col-span-1 text-base">😠</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-[#57FF1C] h-2.5 rounded-full"
                    style={{
                      width: `${percentageHandler(votes_1)}%`,
                    }}
                  ></div>
                </div>
                <p className="col-span-1 text-sm">
                  {votes_1}/{total_count}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsBanner;
