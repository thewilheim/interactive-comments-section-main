/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../App"
import { uid } from "uid"
import moment from "moment"

const AddComment = (props) => {

  const { isReply, parentComment, replyingTo, comment } = props
  
  const {currentUser} = useContext(AuthContext)

  const [commentText, setCommentText] = useState("")

  const handleReply = () => {
    const newReply = {
      id: uid(),
      content:commentText,
      createdAt: moment().format('YYYY-MM-DD'),
      replyingTo,
      user: currentUser
    }
    parentComment.replies.push(newReply)

    fetch(`http://localhost:3000/comments/${parentComment.id}`,{
      method:"PUT",
      body: JSON.stringify(parentComment)
    }).then(res => {
      if(res.ok){
        console.log("Updated");
      }
    })
  }

  const handleComment = () => {
      const newComment = {
        id: uid(),
        content:commentText,
        createdAt: moment().local(),
        user: currentUser,
        replies:[],
        score: 0
      }

    fetch(`http://localhost:3000/comments`,{
      method:"POST",
      body: JSON.stringify(newComment)
    }).then(res => {
      if(res.ok){
        console.log("Updated");
      }
    })
  }

  useEffect(() => {
    if(comment){
      setCommentText(comment.content)
    }
  },[comment])

  return (
    <div className='flex flex-col justify-between p-4 bg-white rounded-xl text-black shadow-lg my-4 md:relative'>
        <form className="w-full md:pr-28 md:pl-16">
            <textarea className="w-full min-h-24 rounded-lg bg-White border p-4 mb-5" placeholder="Add a comment.." value={commentText} onChange={(e) => setCommentText(e.target.value)}>

            </textarea>
            <div className="flex flex-row justify-between mb-2 md:mb-0">
            <img src={currentUser.image.png} alt="" className="w-10 h-10 md:absolute md:left-5 md:top-5 " />
            <button className="bg-Moderate-blue p-1 px-6 rounded-lg text-white font-bold md:absolute md:right-3 md:top-5" onClick={ isReply ? handleReply : handleComment}>SEND</button>
            </div>
        </form>
  </div>
  )
}

export default AddComment