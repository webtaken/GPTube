import { openSans } from '@/components/Common/Fonts'
import PreAnalysis from '@/components/SocialMedia/Youtube/PreAnalysis'
import { LayoutsAvailable } from '@/components/Layouts/map-layouts'

function YoutubePanel() {
  return (
    <div className="pt-20">
      <h2 className={`${openSans.className} text-xl text-center text-typo`}>
        Let&apos;s check what your subscriber think about your video
      </h2>
      <p className="text-sm text-center text-typo">
        Remember: A max of 1000 comments are allowed per video
      </p>
      <PreAnalysis />
    </div>
  )
}

export default YoutubePanel
YoutubePanel.Layout = LayoutsAvailable.Admin
