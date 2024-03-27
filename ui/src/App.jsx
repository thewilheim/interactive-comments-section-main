import Comment from "./components/Comment"
import commentData from "../../data.json"

function App() {

  return (
    <div className="p-4">
    {commentData.comments.map((item) => {
      return <Comment key={item.id} authorImage={item.user.image.png} authorName={item.user.username} commentText={item.content} postedDate={item.createdAt} userRatings={item.score}>
        {item.replies.map((reply) => {
          return <Comment key={item.id} authorImage={reply.user.image.png} authorName={reply.user.username} commentText={reply.content} postedDate={reply.createdAt} userRatings={reply.score} replyingTo={reply.replyingTo} />
        })}
      </Comment>
    })}
    </div>
  )
}

export default App
