import { useRouter } from "next/router";

enum Votes {
  votes1 = 1,
  votes2,
  votes3,
  votes4,
  votes5,
}

const VideoResults: React.FC = () => {
  const router = useRouter();
  let { videoID, total_count, votes_1, votes_2, votes_3, votes_4, votes_5 } =
    router.query;

  const transformQueryParameter = (
    parameter: string | string[] | undefined
  ) => {
    if (!parameter) return 0;
    return +parameter;
  };

  const percentageHandler = (vote: Votes) => {
    const totalCount = transformQueryParameter(total_count);
    let countVotes: number = 0;
    switch (vote) {
      case Votes.votes1:
        countVotes = transformQueryParameter(votes_1);
        break;
      case Votes.votes2:
        countVotes = transformQueryParameter(votes_2);

        break;
      case Votes.votes3:
        countVotes = transformQueryParameter(votes_3);

        break;
      case Votes.votes4:
        countVotes = transformQueryParameter(votes_4);

        break;
      default:
        countVotes = transformQueryParameter(votes_5);
        break;
    }
    if (totalCount === 0) return 0;
    return 100 * (countVotes / totalCount);
  };

  return (
    <div>
      <p className="text-2xl text-[#006FFF] text-center my-4">
        Here is the analysis of your video 🤗!
      </p>
      <div className="grid justify-items-center">
        <a
          href={`https://youtu.be/${videoID}`}
          target="_blank"
          className="mx-auto font-medium text-[#006FFF] dark:text-blue-500 hover:underline"
        >
          <span className="text-center">https://youtu.be/{videoID}</span>
        </a>
      </div>
      <div className="bg-[#FFF8F8] m-4 rounded-md">
        <p className="p-4 text-center text-[#006FFF]">
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
                Our rate AI model ranks the overall satisfaction of your users
                in a scale from 1 to 5, where 5 is an excellent opinion of your
                content and 1 is a bad opinion from a user.
              </p>
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
                        width: `${percentageHandler(Votes.votes5)}%`,
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
                        width: `${percentageHandler(Votes.votes4)}%`,
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
                        width: `${percentageHandler(Votes.votes3)}%`,
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
                        width: `${percentageHandler(Votes.votes2)}%`,
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
                        width: `${percentageHandler(Votes.votes1)}%`,
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
    </div>
  );
};

export default VideoResults;
