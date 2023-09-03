import Image from 'next/image'
import { Layout } from 'antd'

const { Content } = Layout

interface ServiceCardProps {
  left?: boolean
  content: string
  image: string
}

function ServiceCard({ left, content, image }: ServiceCardProps) {
  if (left) {
    return (
      <Content className="grid items-center w-full px-4 py-2 mx-auto opacity-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 rounded-2xl md:p-6 sm:py-4">
        <div className="grid justify-center mx-auto w-fit">
          <Image
            alt="analysis report"
            className="w-48 h-48 mx-auto my-auto md:h-64 md:w-64 lg:w-72 lg:h-72"
            src={image}
          />
        </div>
        <div className="grid gap-2 mx-4 lg:gap-6">
          <div className="flex gap-2">
            <p className={` text-typo text-lg text-justify mx-5`}>{content}</p>
          </div>
        </div>
      </Content>
    )
  }

  return (
    <Content className="grid items-center w-full px-4 py-2 mx-auto opacity-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 rounded-2xl md:p-6 sm:py-4">
      <div className="grid gap-2 mx-4 lg:gap-6">
        <div className="flex gap-2">
          <p className={` text-typo text-lg text-justify mx-5`}>{content}</p>
        </div>
      </div>
      <div className="grid justify-center mx-auto w-fit">
        <Image
          alt="analysis report"
          className="w-48 h-48 mx-auto my-auto md:h-64 md:w-64 lg:w-72 lg:h-72"
          src={image}
        />
      </div>
    </Content>
  )
}

export default ServiceCard
