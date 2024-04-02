import { uid } from 'uid';

export const addComment = (commentText, currentUser) => {
    const newComment = {
        id: uid(),
        content:commentText,
        createdAt: new Date(),
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

export const addNewReply = (commentText, currentUser, replyingTo, parentId, allComments) => {
    const parentComment  = allComments.find(item => item.id === parentId);

    console.log(parentId)

    const newReply = {
      id: uid(),
      content:commentText,
      createdAt: new Date(),
      replyingTo,
      user: currentUser
    }

    parentComment.replies.push(newReply)

    fetch(`http://localhost:3000/comments/${parentId}`,{
      method:"PUT",
      body: JSON.stringify(parentComment)
    }).then(res => {
      if(res.ok){
        console.log("Updated");
      }
    })
  }

  export const deleteComment = (parentId) => {
    fetch(`http://localhost:3000/comments/${parentId}`,{
        method:"DELETE",
      }).then(res => {
        if(res.ok){
          console.log("Deleted");
        }
      })
  }

  export const removeComment = (parentId, replyId, allComments) => {

    const updatedParent = allComments.find(item => item.id === parentId);

    const updatedReplies = updatedParent.replies.filter((reply) => reply.id !== replyId)

    updatedParent.replies = updatedReplies

    console.log(parentId);

    fetch(`http://localhost:3000/comments/${parentId}`,{
      method:"PUT",
      body: JSON.stringify(updatedParent)
    }).then(res => {
      if(res.ok){
        console.log("Updated");
      }
    })
  }