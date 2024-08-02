import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { validateEmail } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { handleTokenUserLogin } from "../../features/userLoginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    }
    if (!password) {
      setError("Please enter a valid password.");
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
        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
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
    }
  };

  //SIGN-UP
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      });

      //handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.error);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
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
        {register && <input type="text" required placeholder="isim" value={fullname} onChange={(e) => setFullname(e.target.value)} />}
        <input type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span onClick={handlePasswordShow}>{showPassword ? <IoEyeSharp /> : <BsFillEyeSlashFill />}</span>
        </div>
        <button type="submit">kirish</button>

        <p>
          {register ? "Akkaunt bor" : "Akkaun yoqmi?"} <span onClick={handleRegister}>{register ? "Login" : "Register"}</span>
        </p>

        <span style={{ color: "red" }}>{error}</span>
      </form>
    </div>
  );
};

export default Login;
