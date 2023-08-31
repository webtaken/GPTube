import { useState } from 'react'

import PreAnalysisForm from './PreAnalysisForm'
import PreAnalysisResult from './PreAnalysisResult'

function PreAnalysis() {
  const [videoID, setVideoID] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [numberOfComments, setNumberOfComments] = useState(0)
  const [requiresEmail, setRequiresEmail] = useState(true)

  return (
    <>
      <div className="mx-60 mt-10">
        <PreAnalysisForm
          setImageURL={setImageURL}
          setNumberOfComments={setNumberOfComments}
          setRequiresEmail={setRequiresEmail}
          setTags={setTags}
          setVideoID={setVideoID}
          setVideoTitle={setVideoTitle}
        />
      </div>
      {videoTitle !== '' && (
        <div className="w-full">
          <PreAnalysisResult
            imageURL={imageURL}
            numberOfComments={numberOfComments}
            requiresEmail={requiresEmail}
            tags={tags}
            videoID={videoID}
            videoTitle={videoTitle}
          />
        </div>
      )}
    </>
  )
}

export default PreAnalysis
