import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { useLocation, useNavigate, Link } from "react-router-dom";

const LoginScreen = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

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
    <div className='flex flex-col justify-center items-center p-6 bg-white rounded-xl text-black shadow-lg my-4 max-h-96'>
      <h1 className="font-bold text-2xl">Sign In</h1>
        <form className="w-full" onSubmit={submitHandler}>
          <div>
            <label htmlFor="">Username</label>
            <input type="text" className="w-full rounded-lg bg-White border p-2 mb-5" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" className="w-full rounded-lg bg-White border p-2 mb-5" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
            <button className="bg-Moderate-blue p-2 rounded-lg text-white font-bold w-full">Sign in</button>
        </form>
        <Link to={"/register"} className="mt-4 cursor-pointer hover:text-Moderate-blue">Don't have an account?</Link>
  </div>
  );
};

export default LoginScreen;
