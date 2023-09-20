import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import helpers from "../helpers";
import { AiTwotoneMail, AiFillGoogleCircle} from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFacebook} from 'react-icons/bs';

export default function Login() {
  const [logError, setLogError] = useState("");
  const [email, changeEmail] = useState("");
  const [pass, changePass] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();

    const loginObj = helpers.formParser(e.target.elements);

    try {
      const response = await axios.post("http://localhost:5001/user/login", loginObj, { withCredentials: true });
      if (response.data.success) {
        navigate("/profile");
      } else {
        setLogError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
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
            <button type="submit" className="btn">
              Login
            </button>
          </form>
          <div className="login-register">
            <p>
              Don't have an account? <a href="#" className="rejister-link">Register</a>
            </p>
          </div>

          <div >

            <div className="flex justify-around my-2 mt-5">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-accent/[0.5] cursor-pointer">
                <BsFacebook size={20}/>
              </div>
              <div className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-accent/[0.5] cursor-pointer">
               <AiFillGoogleCircle size={23} />
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
