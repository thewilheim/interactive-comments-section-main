import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useRegisterMutation,
  useUploadUserImageMutation,
} from "../slices/userApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Filter from "bad-words";

const RegisterScreen = () => {
  const filter = new Filter()
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [uploadUserImage] = useUploadUserImageMutation();
  const [error, setError] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/comments";

  const submitHandler = async (e) => {
    e.preventDefault();


    if(filter.isProfane(username)){
      setError(!error)
      return
    }

    try {
      const res = await register({ username, password, image }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      console.log(err?.data.message || err?.error);
    }
  };

  async function uploadFileHandler(event) {
    const formData = new FormData();

    formData.append("image", event.target.files[0]);
    try {
      const res = await uploadUserImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      //@ts-ignore
      console.log(error);
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-white rounded-xl text-black shadow-lg m-4 max-h-1/4">
      {image ? (
        <img
          src={image}
          alt=""
          className="w-24 h-24 object-cover rounded-full mt-2"
        />
      ) : null}
      <h1 className="font-bold text-2xl my-2">Create an account</h1>
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error:</span> Inappropriate username please choose a different one
        </div>
      )}
      <form className="w-full" onSubmit={submitHandler}>
        <div>
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="w-full rounded-lg bg-White border p-2 mb-5"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="w-full rounded-lg bg-White border p-2 mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Upload an image</label>
          <input type="file" className="my-2" onChange={uploadFileHandler} />
        </div>
        <button className="bg-Moderate-blue p-2 rounded-lg text-white font-bold w-full">
          Sign up
        </button>
      </form>
      <Link
        to={"/login"}
        className="mt-4 cursor-pointer hover:text-Moderate-blue"
      >
        Already have an account?
      </Link>
    </div>
  );
};

export default RegisterScreen;
