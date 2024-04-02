/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import replyIcon from "../assets/icon-reply.svg";
import UserRating from "./UserRating.jsx";
import { AuthContext, AppContext } from "../App.jsx";
import editIcon from "../assets/icon-edit.svg"
import deleteIcon from "../assets/icon-delete.svg"
import AddComment from "./AddComment.jsx";
import { deleteComment, removeComment } from "../utils/api.js";

const Comment = (props) => {

  const {
    comment,
    isReply,
    parentId,
    children
  } = props;

  const currentUser = useContext(AuthContext);
  const allComments = useContext(AppContext)

  const [replyingActive, setReplyingActive] = useState(false)

  const handleReply = () => {
    setReplyingActive(!replyingActive)
  }
  
  const handleEdit = () => {

  }

  const handleDelete = () => {
    isReply ? removeComment(parentId, comment.id, allComments) : deleteComment(comment.id)
  }

  return (
    <>
      <div className="flex flex-col justify-between p-4 bg-white rounded-xl text-black shadow-lg my-2 md:relative md:my-4">
        <div className="flex flex-row items-center md:ml-20">
          <img src={comment.user.image.png} alt="" className="w-10" />
          {currentUser.username === comment.user.username ? (
            <p className="font-bold px-3">
              {comment.user.username}{" "}
              <strong className="align-middle ml-1 px-2 py-0.5 text-white font-medium rounded bg-Moderate-blue">
                you
              </strong>{" "}
            </p>
          ) : (
            <p className="font-bold px-3">{comment.user.username}</p>
          )}
          <p className="text-black/70">{comment.createdAt}</p>
        </div>
        {comment.replyingTo ? (
          <p className="py-4 text-black/70 md:ml-20">
            <strong className="text-Moderate-blue">@{comment.replyingTo}</strong>{" "}
            {comment.content}
          </p>
        ) : (
          <p className="py-4 text-black/70 md:ml-20">{comment.content}</p>
        )}
        <div className="flex flex-row justify-between">
          <div className="md:absolute md:top-5">
            <UserRating defaultRating={comment.score} />
          </div>
          <div className="flex flex-row justify-center items-center md:absolute md:right-6 md:top-5">
          {currentUser.username === comment.user.username ? (
            <>
              <div className="flex flex-row justify-center items-center mr-4">
                <img src={deleteIcon} alt="" className="mr-2" />
                <button className="font-bold text-red-500" onClick={() => handleDelete()}>Delete</button>
              </div>
              <div className="flex flex-row justify-center items-center ">
                <img src={editIcon} alt="" className="mr-2" />
                <button className="font-bold text-Moderate-blue">Edit</button>
              </div>
            </>
          ) : (
            <>
              <img src={replyIcon} alt="" className="mr-2" />
              <button className="font-bold text-Moderate-blue" onClick={handleReply}>Reply</button>
            </>
          )}
          </div>
        </div>
      </div>
      <div className="pl-12 border-l-4 ml-10 border-black/10">
      {replyingActive ? (
        <AddComment isReply={true} replyingTo={comment.replyingTo} parentId={parentId}/>
      ) : null}
        {children}
      </div>
    </>
  );
};

export default Comment;
