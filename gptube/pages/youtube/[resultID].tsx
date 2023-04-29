import { useRouter } from "next/router";
import ResultsBanner from "@/components/Tools/Youtube/ResultsBanner";
import { MyPage } from "@/components/Common/Types";
import { AiFillYoutube } from "react-icons/ai";

enum Votes {
  votes1 = 1,
  votes2,
  votes3,
  votes4,
  votes5,
}

const VideoResults: MyPage = () => {
  const router = useRouter();
  let {
    videoID,
    total_count,
    votes_1,
    votes_2,
    votes_3,
    votes_4,
    votes_5,
    errors_count,
  } = router.query;

  const queryParamToNum = (parameter: string | string[] | undefined) => {
    if (!parameter) return 0;
    return +parameter;
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
          className="flex gap-2 items-center mx-auto font-medium text-[#006FFF] dark:text-blue-500 hover:underline"
        >
          <AiFillYoutube className="text-red-600" />{" "}
          <span className="text-center">https://youtu.be/{videoID}</span>
        </a>
      </div>
      <ResultsBanner
        votes_1={queryParamToNum(votes_1)}
        votes_2={queryParamToNum(votes_2)}
        votes_3={queryParamToNum(votes_3)}
        votes_4={queryParamToNum(votes_4)}
        votes_5={queryParamToNum(votes_5)}
        total_count={queryParamToNum(total_count)}
        errors_count={queryParamToNum(errors_count)}
      />
    </div>
  );
};

export default VideoResults;
VideoResults.Layout = "Admin";
