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