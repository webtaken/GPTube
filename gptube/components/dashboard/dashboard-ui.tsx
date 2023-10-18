import { Card, CardBody } from '@nextui-org/card'

import { FilterVideoAnalysis } from './filter-video-analysis'
import { ButtonNewAnalysis } from './button-new-analysis'

export function DashboardUI() {
  return (
    <main className="max-w-screen-lg px-6 py-6 mx-auto space-y-6">
      <header className="flex justify-end">
        <ButtonNewAnalysis />
      </header>
      <section className="flex gap-10">
        <aside>
          <Card className="bg-white w-80" radius="sm" shadow="sm">
            <CardBody>
              <FilterVideoAnalysis />
            </CardBody>
          </Card>
        </aside>
        <aside className="flex-1">
          <Card className="min-h-[66.5dvh]" radius="sm" shadow="sm">
            <CardBody className="flex items-center justify-center">
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
            </CardBody>
          </Card>
        </aside>
      </section>
    </main>
  )
}
