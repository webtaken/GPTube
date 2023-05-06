import { useState } from "react";
import PreAnalysisForm from "./PreAnalysisForm";
import PreAnalysisResult from "./PreAnalysisResult";

const PreAnalysis: React.FC = () => {
  const [videoID, setVideoID] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [requiresEmail, setRequiresEmail] = useState(true);

  return (
    <>
      <div className="mx-60 mt-10">
        <PreAnalysisForm
          setVideoID={setVideoID}
          setVideoTitle={setVideoTitle}
          setImageURL={setImageURL}
          setTags={setTags}
          setRequiresEmail={setRequiresEmail}
          setNumberOfComments={setNumberOfComments}
        />
      </div>
      {videoTitle !== "" && (
        <div className="w-full">
          <PreAnalysisResult
            videoID={videoID}
            videoTitle={videoTitle}
            imageURL={imageURL}
            tags={tags}
            numberOfComments={numberOfComments}
            requiresEmail={requiresEmail}
          />
        </div>
      )}
    </>
  );
};

export default PreAnalysis;
