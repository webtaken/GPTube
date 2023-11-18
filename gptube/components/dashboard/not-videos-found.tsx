import { ButtonNewAnalysis } from './button-new-analysis'

export function NotVideoFound() {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-lg font-medium">No videos found</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="No videos yet"
        className="-my-8 pointer-events-none blur-0"
        data-nimg="1"
        decoding="async"
        height="400"
        loading="lazy"
        src="https://app.dub.co/_static/illustrations/call-waiting.svg"
        width="400"
      />
      <ButtonNewAnalysis />
    </div>
  )
}
