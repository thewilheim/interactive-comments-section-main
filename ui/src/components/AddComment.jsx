/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useCreateCommentMutation, useGetCommentsQuery, useCreateReplyMutation} from "../slices/commentSlice.js";
import { useSelector } from "react-redux";
import Filter from "bad-words";
const AddComment = (props) => {

  const filter = new Filter()
  const { isReply, parentComment, replyingTo, comment, setReplyingActive } = props

  const [commentText, setCommentText] = useState("")
  const [error, setError] = useState(false)

  const {refetch} = useGetCommentsQuery()
  const [createComment] = useCreateCommentMutation()
  const [createReply] = useCreateReplyMutation()
  
  const { userInfo } = useSelector((state) => state.auth);

  const handleReply = async (e) => {
    e.preventDefault()

    if(filter.isProfane(commentText) || commentText.length <= 0){
      setError(true)
      return
    } else {
      setError(false)
    }

    try {
      await createReply({content:commentText, replyingTo, _id: parentComment._id});
      refetch()
      setCommentText("")
      setReplyingActive(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if(filter.isProfane(commentText) || commentText.length <= 0){
      setError(true)
      return
    } else {
      setError(false)
    }
    try {
      await createComment({content: commentText});
      refetch()
      setCommentText("")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(comment){
      setCommentText(comment.content)
    }
  },[comment])


  return (
    <div className='flex flex-col justify-between p-4 bg-white rounded-xl text-black shadow-lg my-4 md:relative'>
        <form className="w-full md:pr-28 md:pl-16">
        {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error:</span> Please enter an appropriate comment
        </div>
      )}
            <textarea className="w-full min-h-24 rounded-lg bg-White border p-4 mb-5" placeholder="Add a comment.." value={commentText} onChange={(e) => setCommentText(e.target.value)} required>

            </textarea>
            <div className="flex flex-row justify-between mb-2 md:mb-0">
            <img src={userInfo.image} alt="" className="w-10 h-10 md:absolute md:left-5 md:top-5 rounded-full" />
            <button className="bg-Moderate-blue p-1 px-6 rounded-lg text-white font-bold md:absolute md:right-3 md:top-5" onClick={ isReply ? handleReply : handleComment}>SEND</button>
            </div>
        </form>
  </div>
  )
}

export default AddComment