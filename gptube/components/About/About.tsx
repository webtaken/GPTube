import Image from 'next/image'

import smile from '@/assets/img/smile.png'
import badMood from '@/assets/img/bad-mood.png'
import unhappy from '@/assets/img/unhappy.png'

// This can be in a file constants or similiar
const cardsAbout = [
  {
    title: 'GOOD',
    img: {
      src: smile,
      alt: 'Happy Face',
    },
  },
  {
    title: 'NEUTRAL',
    img: {
      src: badMood,
      alt: 'Neutral Face',
    },
  },
  {
    title: 'BAD',
    img: {
      src: unhappy,
      alt: 'Sad Face',
    },
  },
]

function About() {
  return (
    <section className="grid h-full grid-cols-2 mx-10">
      <div className="flex-col mx-24 my-auto ">
        <p className="mb-10 mr-10 text-3xl font-black uppercase">Get insights from your video</p>
        <p className="text-xl text-gray-500">
          We use the <span className="font-bold">AI technology</span> to provide you with the most
          accurate <span className="font-bold">sentiment analysis</span> of your video
        </p>
      </div>
      <div className="flex my-auto">
        {cardsAbout.map(card => (
          <div
            key={card.title}
            className="h-auto w-[220px] bg-[#f7f7f7] shadow-[0_0_5px_rgba(0,0,0,0.2)] transition-all duration-[0.3s] ease-[ease-in-out] border m-3.5 px-4 py-2.5 rounded-[20px] border-solid border-[#f7f7f7] hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]; "
          >
            <Image alt={card.img.alt} src={card.img.src} width={100} />
            <p>{card.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About
