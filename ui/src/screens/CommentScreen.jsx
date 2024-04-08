import {useGetCommentsQuery} from "../slices/commentSlice.js"
import Comment from "../components/Comment.jsx"
import AddComment from "../components/AddComment.jsx";
import { useLogoutMutation } from "../slices/userApiSlice.js";
import { logout } from "../slices/authSlice.js"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const CommentScreen = () => {
    const { data:comments, isLoading } = useGetCommentsQuery();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation(); 
    const logoutHandler = async () => {
      try {
          await logoutApiCall().unwrap()
          dispatch(logout())
          navigate('/login')
      } catch (error) {
          console.log(error);
      }
    }
  return (
    isLoading ? <>Loading</> : (
        <div className="max-w-4xl">
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
        <button className="text-red-600 font-bold" onClick={logoutHandler}>Logout</button>
      </div>
    )
  )
}
