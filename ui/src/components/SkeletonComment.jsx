
const SkeletonComment = () => {
  return (
    <div className="flex flex-col justify-between p-4 bg-white rounded-xl text-black shadow-lg my-2 md:relative md:my-4 min-h-36 animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
  </div>
  )
}

export default SkeletonComment