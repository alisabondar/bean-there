import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios-config.js";
import { AiTwotoneMail, AiFillGoogleCircle } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";
import state from "../store";

export default function Login() {
  const navigate = useNavigate();

  const [logError, setLogError] = useState("");
  const [otp, toggleOtp] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user/login", data, {
        withCredentials: true,
      });
      if (response.data.success) {
        state.login = false;
        state.active = response.data.userId;
        navigate("/profile");
      } else if (response.data.otp) {
        setData({ ...data, userId: response.data.user_id });
        toggleOtp(true);
      } else {
        setLogError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const otpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/verifyotp", data, {
        withCredentials: true,
      });
      if (response.data.success) {
        toggleOtp(false);
        state.login = false;
        state.active = response.data.userId;
        setData({ email: "", password: "" });
        navigate("/profile");
      } else {
        setLogError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // login page exit
  const handleOuterClick = (e) => {
    const formDiv = document.querySelector(".form-box");
    if (formDiv && !formDiv.contains(e.target)) {
      if (!otp) {
        state.login = false;
      }
    } else if (otp) {
      var formDiv2 = document.querySelector(".form-box2");
      if (formDiv2 && !formDiv2.contains(e.target)) {
        toggleOtp(false);
        state.login = false;
      }
    }
  };
  const toggleRegisterLink = () => {
    state.register = true;
    state.login = false;
  };

  const googleSubmit = async (e) => {
    e.preventDefault();
    window.open("http://localhost:5001/user/google", "_self");
  };

  const githubSubmit = async (e) => {
    e.preventDefault();
    window.open("https://www.facebook.com/", "_self");
  };

  if (!otp) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={handleOuterClick}
      >
        <div className="wrapper ">
          <div className="form-box ">
            {logError && <div className="error">{logError}</div>}
            <h2>Login</h2>
            <form onSubmit={loginSubmit} id="myLoginForm">
              <div className="input-box">
                <span className="icon">
                  <AiTwotoneMail size={25} />
                </span>
                {data.email === "" ? <label>Email:</label> : null}
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email || ""}
                  required
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <RiLockPasswordFill size={25} />
                </span>

                {data.password === "" ? <label>Password:</label> : null}
                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  value={data.password || ""}
                  required
                />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className="w-full h-full bg-[#A98E77] py-3 border-none outline-none rounded-md cursor-pointer text-lg font-semibold mt-7 text-black hover:bg-[#61493C]"
              >
                LOGIN
              </button>
            </form>
            <div className="login-register">
              <p>
                Don't have an account?{" "}
                <a className="rejister-link" onClick={toggleRegisterLink}>
                  Register
                </a>
              </p>
            </div>

            <div>
              <div className="flex justify-around my-2 mt-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/[0.5] cursor-pointer"
                  onClick={githubSubmit}
                >
                  <BsFacebook size={35} />
                </div>
                <div
                  className="w-10 h-10 rounded-full  flex items-center justify-center hover:bg-accent/[0.5] cursor-pointer"
                  onClick={googleSubmit}
                >
                  <AiFillGoogleCircle size={64} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={handleOuterClick}
      >
        <div className="wrapper form-box2">
          <div className="justify-center">
            {logError && <div className="error">{logError}</div>}
            <h2>Enter Passcode</h2>
            <h3>Check your email inbox or spam for an OTP code.</h3>
            <input
              type="number"
              min="1000"
              max="9999"
              name="otp"
              className="ml-[33.5%] mt-[20px] w-[100px]"
              onChange={(e) => setData({ ...data, otp: e.target.value })}
              value={data.otp || ""}
              required
            />
            <form onSubmit={otpSubmit}>
              <button type="submit" className="btn ml-[35%] mt-[20px]">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
