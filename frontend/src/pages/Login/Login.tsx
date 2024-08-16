import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { validateEmail } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { handleTokenUserLogin, selectedLoadingToken } from "../../features/userLoginSlice";
import { useAppSelector } from "../../hooks/hooks";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectedLoadingToken);
  const [register, setRegister] = useState<boolean>(false);
  const [boss, setBoss] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [commonError, setError] = useState<string>("");

  const setBossStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoss(e.target.value === "SHOH");
  };

  const handleRegister = () => {
    setRegister(!register);
  };

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  //LOGIN
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email adress.");
      toast.error(commonError);
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      toast.error(commonError);
      return;
    }

    setError("");

    //Login Api Call

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        dispatch(handleTokenUserLogin(response.data.accessToken));
        navigate("/");
      }
    } catch (error: any) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      toast.error(commonError);
    }
  };

  //SIGN-UP
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) {
      alert("Сервер еще загружается. Пожалуйста, подождите.");
      return;
    }

    if (!fullname) {
      setError("Please set name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please set valid email");
      return;
    }
    if (!password) {
      setError("Please set the password");
      return;
    }

    setError("");

    //Sign Up Api call
    try {
      const response = await axiosInstance.post("/create-accaunt", {
        fullname: fullname,
        email: email,
        password: password,
        userBoss: boss,
      });
      console.log(response);

      //handle successful registration response
      if (response.data && response.data.error && response.data.message) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        dispatch(handleTokenUserLogin(response.data.accessToken));
        navigate("/");
      }
    } catch (error: any) {
      //handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again");
      }
    }
  };
  //

  return (
    <div className="login">
      <form onSubmit={register ? handleSignUp : handleLogin}>
        <Link to="/" className="closeForm">
          <ImCross />
        </Link>
        <span className="logTxt">Login</span>
        {register && (
          <>
            <input type="text" placeholder="isim" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <input type="text" placeholder="Boss?" onChange={(e) => setBossStatus(e)} />
          </>
        )}
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span onClick={handlePasswordShow}>{showPassword ? <IoEyeSharp /> : <BsFillEyeSlashFill />}</span>
        </div>

        <button type="submit" disabled={loading} className="enterToAccaunt">
          kirish
        </button>

        <p>
          {register ? "Akkaunt bor" : "Akkaun yoqmi?"} <span onClick={handleRegister}>{register ? "Login" : "Register"}</span>
        </p>

        <span style={{ color: "red" }}>{commonError}</span>
      </form>
    </div>
  );
};

export default Login;
