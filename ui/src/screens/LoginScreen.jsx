import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login ] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/comments";

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      console.log(err?.data.message || err?.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name=""
        id=""
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="mt-2">
        Sign in
      </button>
    </form>
  );
};

export default LoginScreen;
