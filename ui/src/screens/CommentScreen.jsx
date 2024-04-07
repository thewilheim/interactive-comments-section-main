import {useGetCommentsQuery} from "../slices/commentSlice.js"
import Comment from "../components/Comment.jsx"
import AddComment from "../components/AddComment.jsx";
export const CommentScreen = () => {
    const { data:comments, isLoading } = useGetCommentsQuery();
  return (
    isLoading ? <>Loading</> : (
        <div className="p-4 max-w-4xl">
        {comments.map((item) => {
          return (
            <Comment
              key={item._id}
              comment={item}
              parentId={item.id}
              parentComment={item}
            >
              {item.replies.map((reply) => {
                return (
                  <Comment
                    key={reply._id}
                    comment={reply}
                    parentComment={item}
                    isReply={true}
                  />
                );
              })}
            </Comment>
          );
        })}
        <AddComment />
      </div>
    )
  )
}
