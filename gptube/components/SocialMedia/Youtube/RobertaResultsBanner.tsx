// import { Layout } from 'antd'

// const { Content } = Layout

// interface RobertaResultsBannerProps {
//   positive: number
//   negative: number
//   neutral: number
//   success_count: number
//   errors_count: number
// }

// function RobertaResultsBanner({
//   positive,
//   negative,
//   neutral,
//   success_count,
//   errors_count,
// }: RobertaResultsBannerProps) {
//   // Make a componente that receives the text and the percentage
//   let textHelper: JSX.Element = (
//     <span>
//       From <span className="font-bold">{success_count}</span> comments, your video has a major
//       positive impact, good job ✅
//     </span>
//   )

//   if (neutral > negative && neutral > positive) {
//     textHelper = (
//       <span>
//         From <span className="font-bold">{success_count}</span> comments, your video has a major
//         neutral impact, keep going 👍
//       </span>
//     )
//   }
//   if (negative > positive && negative > neutral) {
//     textHelper = (
//       <span>
//         From <span className="font-bold">{success_count}</span> comments, your video has a major
//         negative impact, don&apos;t give up 🤙
//       </span>
//     )
//   }

//   const percentageHandler = (percentage: number) => {
//     return (100 * percentage).toFixed(2)
//   }

//   return (
//     <Content className={` max-w-full bg-black-medium mx-20 rounded-md text-typo`}>
//       <p className="pt-4 text-lg font-semibold text-center">
//         Sentiment Analysis <span className="font-bold">(RoBERTa)</span> 🤗
//       </p>
//       <div className="w-full mt-4 rounded-md bg-black-full">
//         <div className="grid grid-cols-1 md:grid-cols-3 place-content-evenly">
//           <div className="m-4 text-xl">
//             <p className="text-center">
//               {percentageHandler(negative)}%
//               <br />
//               😠
//               <br />
//               <span className="text-base">Negative</span>
//             </p>
//           </div>
//           <div className="m-4 text-xl">
//             <p className="text-center">
//               {percentageHandler(neutral)}%
//               <br />
//               😐
//               <br />
//               <span className="text-base">Neutral</span>
//             </p>
//           </div>
//           <div className="m-4 text-xl">
//             <p className="text-center">
//               {percentageHandler(positive)}%
//               <br />
//               😃
//               <br />
//               <span className="text-base">Positive</span>
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="w-full my-8 text-justify">
//         <p className="text-base">
//           RoBERTa model classifies the sentiment of the comments in negative, neutral or positive,
//           this is the average perception about your video. <br />
//           {textHelper}
//         </p>
//         {errors_count !== 0 && (
//           <p className="text-base">
//             Some comments couldn&apos;t be processed 😵{' '}
//             <span className="font-bold text-red-500">{errors_count} comments</span> 🚫
//           </p>
//         )}
//       </div>
//     </Content>
//   )
// }

// export default RobertaResultsBanner
