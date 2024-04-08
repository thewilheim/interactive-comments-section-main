import {Outlet} from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/comments");
    }else{
      navigate("/login");
    }
  }, [userInfo, navigate]);
  return (
    <>
      <Outlet />
    </>
  )
}

export default App;
