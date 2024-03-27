import replyIcon from "../assets/icon-reply.svg"
import UserRating from "./UserRating.jsx"

const Comment = (props) => {
  // eslint-disable-next-line react/prop-types
  const {authorImage,authorName, commentText, postedDate, userRatings, children, replyingTo } = props
  return (
    <>
      <div className='flex flex-col justify-between p-4 bg-white rounded-xl text-black shadow-lg my-2'>
        <div className="flex flex-row items-center">
          <img src={authorImage} alt="" className="w-10" />
          {false ? 
            <p className="font-bold px-3">{authorName} <strong className="align-middle ml-1 px-2 py-0.5 text-white font-medium rounded bg-Moderate-blue">you</strong> </p>
          :
            <p className="font-bold px-3">{authorName}</p> 
          }
          <p className="text-black/70">{postedDate}</p>
        </div>
        {replyingTo ?         <p className="py-4 text-black/70">
          <strong className="text-Moderate-blue">@{replyingTo}</strong> {commentText}</p>:<p className="py-4 text-black/70">{commentText}</p>}
        <div className="flex flex-row justify-between">
          <UserRating defaultRating={userRatings} />
          <div className="flex flex-row justify-center items-center">
          <img src={replyIcon} alt="" className="mr-2"/>
          <button className="font-bold text-Moderate-blue">Reply</button>
          </div>
        </div>
      </div>
      <div className="pl-3 border-l-4 ml-2 border-black/10">
      {children}
      </div>
    </>
  )
}

export default Comment