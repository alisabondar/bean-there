import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios-config.js";
import helpers from "../helpers";
import { AiTwotoneMail, AiFillGoogleCircle} from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFacebook} from 'react-icons/bs';
import state from '../store';



export default function Login() {
  const [logError, setLogError] = useState("");
  const [email, changeEmail] = useState("");
  const [pass, changePass] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();

    const loginObj = helpers.formParser(e.target.elements);

    try {
      const response = await axios.post("/user/login", loginObj, { withCredentials: true });
      if (response.data.success) {
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
      state.login = false;
    }
  };
  const toggleRegisterLink= () => {
    state.register = true;
    state.login = false;
  };

  const googleSubmit = async (e) => {
    e.preventDefault();
    window.open("/user/google", "_self");
  };

  const githubSubmit = async (e) => {
    e.preventDefault();
    window.open("http://localhost:5001/user/github", "_self");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
    onClick={handleOuterClick}>
      <div className="wrapper ">
        <div className="form-box ">
          {logError && <div className="error">{logError}</div>}
          <h2>Login</h2>
          <form onSubmit={loginSubmit}>
            <div className="input-box">
              <span className="icon">
                <AiTwotoneMail size={25} />
              </span>
              {
                email === '' ?   <label >Email:</label> : null            }
              <input
                type="email"
                name="email"
                onChange={(e) => changeEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="input-box">
              <span className="icon">
                <RiLockPasswordFill size={25} />
              </span>

              {
                pass === '' ?   <label>Password:</label> : null            }
              <input
                type="password"
                name="password"
                onChange={(e) => changePass(e.target.value)}
                value={pass}
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
              Don't have an account? <a
               className="rejister-link"
               onClick={toggleRegisterLink}>Register</a>
            </p>
          </div>

          <div >

            <div className="flex justify-around my-2 mt-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/[0.5] cursor-pointer" onClick={githubSubmit}>
                <BsFacebook size={35}/>
              </div>
              <div className="w-10 h-10 rounded-full  flex items-center justify-center hover:bg-accent/[0.5] cursor-pointer" onClick={googleSubmit}>
               <AiFillGoogleCircle size={64} />
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
