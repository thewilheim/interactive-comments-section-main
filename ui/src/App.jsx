import Comment from "./components/Comment";
import { createContext, useEffect, useState } from "react";
import AddComment from "./components/AddComment";

export const AuthContext = createContext(null);
export const AppContext = createContext(null)

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [allComments, setAllComments] = useState([])
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      const res = await fetch("http://localhost:3000/currentUser", {
        method: "GET",
      });
      const data = await res.json();
      setCurrentUser(data);
    }
    fetchCurrentUser();

    async function fetchAllComments() {
      const res = await fetch("http://localhost:3000/comments", {
        method: "GET",
      });
      const data = await res.json();
      setAllComments(data);
      setLoadingData(false);
    }
    fetchAllComments()
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <AppContext.Provider value={allComments}>
      {loadingData ? (
        <div>Loading</div>
      ) : (
          <div className="p-4 max-w-4xl">
            {allComments.map((item) => {
              return (
                <Comment
                  key={item.id}
                  comment={item}
                  parentId={item.id}
                >
                  {item.replies.map((reply) => {
                    return (
                      <Comment
                        key={reply.id}
                        comment={reply}
                        parentId={item.id}
                        isReply={true}
                      />
                    );
                  })}
                </Comment>
              );
            })}
            <AddComment />
          </div>
      )}
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
