import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { AiFillYoutube } from "react-icons/ai";
import { ParsedUrlQuery } from "querystring";

import BertResultsBanner from "@/components/Tools/Youtube/BertResultsBanner";
import RobertaResultsBanner from "@/components/Tools/Youtube/RobertaResultsBanner";
import { firestore } from "@/config/firebase";
import { MyPage } from "@/components/Common/Types";
import { paramValToString } from "@/utils";
import { openSans } from "@/components/Common/Fonts";
import NegativeComments from "@/components/Tools/Youtube/NegativeComments";

interface YoutubeResultsProps {
  analysis: any;
}

const YoutubeResults: MyPage<YoutubeResultsProps> = ({ analysis }) => {
  const videoID = analysis.video_id || null;
  const videoTitle = analysis.video_title || null;
  const bertResults = analysis.results.bert_results || null;
  const robertaResults = analysis.results.roberta_results || null;
  const negativeComments = analysis.results.negative_comments || null;
  return (
    <div className={`${openSans.className}`}>
      <p className="text-2xl text-typo text-center mt-6">
        Here is the analysis of your video 🤗!
      </p>
      <p className="text-lg text-typo text-center my-4">
        "{videoTitle}"
      </p>
      <div className="grid justify-items-center">
        <a
          href={`https://youtu.be/${videoID}`}
          target="_blank"
          className="flex gap-2 items-center mx-auto font-medium text-typo hover:underline"
        >
          <AiFillYoutube className="text-red-600" />{" "}
          <span className="text-center">https://youtu.be/{videoID}</span>
        </a>
      </div>
      <BertResultsBanner
        score_1={bertResults.score_1}
        score_2={bertResults.score_2}
        score_3={bertResults.score_3}
        score_4={bertResults.score_4}
        score_5={bertResults.score_5}
        success_count={bertResults.success_count}
        errors_count={bertResults.errors_count}
      />
      <RobertaResultsBanner
        positive={robertaResults.positive}
        neutral={robertaResults.neutral}
        negative={robertaResults.negative}
        success_count={robertaResults.success_count}
        errors_count={robertaResults.errors_count}
      />
      <NegativeComments videoID={videoID} comments={negativeComments} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  YoutubeResultsProps,
  ParsedUrlQuery
> = async (context) => {
  const { params } = context;
  const resultID = paramValToString(params?.resultID);

  const docRef = doc(firestore, "YoutubeResults", resultID);
  const docSnap = await getDoc(docRef);

  // Check if the document exists
  if (!docSnap.exists()) {
    return { notFound: true };
  }

  // Extract the document data and map it to a MyData object
  const docData = docSnap.data();
  const analysis = {
    _id: docSnap.id,
    video_id: docData.video_id || null,
    video_title: docData.video_title || null,
    results: docData.results || null,
    error: docData.error || null,
  };

  // Pass data to the page component as props
  return {
    props: { analysis },
  };
};

export default YoutubeResults;
YoutubeResults.Layout = "Admin";
