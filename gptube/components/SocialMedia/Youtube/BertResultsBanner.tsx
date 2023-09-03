import { Layout } from 'antd'

const { Content } = Layout

interface BertResultsBannerProps {
  scores: [number, number, number, number, number]
  success_count: number
  errors_count: number
}

function BertResultsBanner({ scores, success_count, errors_count }: BertResultsBannerProps) {
  const percentageHandler = (votes: number) => {
    if (success_count === 0) return 0

    return 100 * (votes / success_count)
  }

  return (
    <Content className={` max-w-full bg-black-medium mx-20 rounded-md text-typo`}>
      <p className="pt-4 text-lg font-semibold text-center">
        Satisfaction by Rates <span className="font-bold">(BERT)</span> ⭐
      </p>

      <div className="my-4 border-2 border-white rounded-md">
        <p className="mt-2 text-base text-center">Votes</p>
        <div className="grid grid-cols-1 pb-2 my-2 space-y-2">
          {scores.map((score, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex items-center justify-center mx-4 gap-x-4">
              <p className="col-span-1 text-base">😃</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-black-full">
                <div
                  className="bg-[#57FF1C] h-2.5 rounded-full"
                  style={{
                    width: `${percentageHandler(score)}%`,
                  }}
                />
                <p className="col-span-1 text-sm text-center">
                  {score}/{success_count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md bg-black-full">
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
        <p className="text-base text-justify">
          BERT is our rate model that ranks the overall satisfaction of your users in a scale from 1
          to 5, where 5 is an excellent opinion of your content and 1 is a bad opinion.
        </p>
        {errors_count !== 0 && (
          <p className="text-base text-center">
            Sorry 😵 We couldn&apos;t process{' '}
            <span className="font-bold text-red-500">{errors_count} comments</span> 🚫
          </p>
        )}
      </div>
    </Content>
  )
}

export default BertResultsBanner
