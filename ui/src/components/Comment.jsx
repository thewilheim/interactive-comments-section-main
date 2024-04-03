/* eslint-disable react/prop-types */
import moment from "moment"
import { useContext, useState } from "react";
import replyIcon from "../assets/icon-reply.svg";
import UserRating from "./UserRating.jsx";
import { AuthContext } from "../App.jsx";
import editIcon from "../assets/icon-edit.svg";
import deleteIcon from "../assets/icon-delete.svg";
import AddComment from "./AddComment.jsx";
import DeleteModal from "./DeleteModal.jsx";

const Comment = (props) => {
  const { comment, isReply, parentId, parentComment, children } = props;

  const { currentUser } = useContext(AuthContext);

  const [replyingActive, setReplyingActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [commentText, setCommentText] = useState(comment.content || "")

  const handleReply = () => {
    setReplyingActive(!replyingActive);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    if(isReply){
      const replyIndex = parentComment.replies.findIndex((item) => item.id === comment.id)
      parentComment.replies[replyIndex].content = commentText
      fetch(`http://localhost:3000/comments/${parentComment.id}`, {
        method: "PUT",
        body: JSON.stringify(parentComment),
      }).then((res) => {
        if (res.ok) {
          setIsEditing(!isEditing)
        }
      });
    } else {
      comment.content = commentText
      fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: "PUT",
        body: JSON.stringify(comment),
      }).then((res) => {
        if (res.ok) {
          setIsEditing(!isEditing)
          location.reload()
        }
      });
    }
  }

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const deleteComment = () => {
    fetch(`http://localhost:3000/comments/${parentId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setOpenDeleteModal(false);
        location.reload();
      }
    });
  };

  const deleteReply = () => {
    const updatedReplies = parentComment.replies.filter(
      (reply) => reply.id !== comment.id
    );
    parentComment.replies = updatedReplies;
    fetch(`http://localhost:3000/comments/${parentComment.id}`, {
      method: "PUT",
      body: JSON.stringify(parentComment),
    }).then((res) => {
      if (res.ok) {
        setOpenDeleteModal(false);
        location.reload();
      }
    });
  };

  const formatDate = (postedDate) => {
    return moment(postedDate).fromNow()
  }
  return (
    <>
      {openDeleteModal ? (
        <DeleteModal
          deleteComment={isReply ? deleteReply : deleteComment}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      ) : null}
      <div className="flex flex-col justify-between p-4 bg-white rounded-xl text-black shadow-lg my-2 md:relative md:my-4 min-h-36">
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
          <p className="text-black/70">{formatDate(comment.createdAt)}</p>
        </div>
        {isEditing ? (
          <div className="w-full md:pr-12 md:pl-16 mt-2">
            <textarea
              className="w-full min-h-24 rounded-lg bg-White border p-4 mb-5 "
              placeholder="Add a comment.."
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            ></textarea>
          </div>
        ) : comment.replyingTo ? (
          <p className="py-4 text-black/70 md:ml-20">
            <strong className="text-Moderate-blue">
              @{comment.replyingTo}
            </strong>{" "}
            {commentText}
          </p>
        ) : (
          <p className="py-4 text-black/70 md:ml-20">{commentText}</p>
        )}
        <div className="flex flex-row justify-between w-full">
          <div className="md:absolute md:top-5">
            <UserRating defaultRating={comment.score} />
          </div>
          <div className="flex flex-row justify-center items-center">
            {currentUser.username === comment.user.username ? (
              isEditing ? (
                <div className="md:h-10">
                <button className=" md:absolute md:right-5 bg-Moderate-blue p-2 px-6 rounded-lg text-white font-bold" onClick={handleUpdate}>
                  Update
                </button>
              </div>
              ) : (
                <div className="flex flex-row justify-center items-center md:absolute md:right-6 md:top-5">
                  <div className="flex flex-row justify-center items-center mr-4">
                    <img src={deleteIcon} alt="" className="mr-2" />
                    <button
                      className="font-bold text-red-500"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex flex-row justify-center items-center ">
                    <img src={editIcon} alt="" className="mr-2" />
                    <button
                      className="font-bold text-Moderate-blue"
                      onClick={() => handleEdit()}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-row justify-center items-center md:absolute md:right-6 md:top-5">
                <img src={replyIcon} alt="" className="mr-2" />
                <button
                  className="font-bold text-Moderate-blue"
                  onClick={handleReply}
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:pl-12 md:border-l-4 md:ml-10 border-black/10">
        {replyingActive ? (
          <AddComment
            isReply={true}
            replyingTo={comment.user.username}
            parentComment={parentComment}
          />
        ) : null}
        {children}
      </div>
    </>
  );
};

export default Comment;
