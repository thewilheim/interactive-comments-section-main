/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { AppContext, AuthContext } from "../App"
import { addNewReply, addComment } from "../utils/api"

const AddComment = (props) => {

  const { isReply, parentId, replyingTo } = props
  
  const currentUser = useContext(AuthContext)
  const allComments = useContext(AppContext)

  const [commentText, setCommentText] = useState("")

  const handleReply = (e) => {
    e.preventDefault()
    addNewReply(commentText,currentUser,replyingTo,parentId,allComments)
  }

  const handleComment = () => {
    addComment(commentText, currentUser)
  }

  return (
    <div className='flex flex-col justify-between p-4 bg-white rounded-xl text-black shadow-lg my-4 md:relative'>
        <form className="w-full md:pr-28 md:pl-16">
            <textarea className="w-full min-h-24 rounded-lg bg-White border p-4 mb-5" placeholder="Add a comment.." value={commentText} onChange={(e) => setCommentText(e.target.value)}>

            </textarea>
            <div className="flex flex-row justify-between mb-2 md:mb-0">
            <img src={currentUser.image.png} alt="" className="w-10 h-10 md:absolute md:left-5 md:top-5 " />
            <button className="bg-Moderate-blue p-1 px-6 rounded-lg text-white font-bold md:absolute md:right-3 md:top-5" onClick={ isReply ? handleReply : handleComment }>SEND</button>
            </div>
        </form>
  </div>
  )
}

export default AddComment