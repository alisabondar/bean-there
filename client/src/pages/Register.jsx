import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import helpers from "../helpers";
import { AiTwotoneMail, AiFillGoogleCircle } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";
import { FaGrin } from "react-icons/fa";

import state from '../store';

export default function Register() {
  const [registerError, setRegisterError] = useState("");
  const [email, changeEmail] = useState("");
  const [pass, changePass] = useState("");
  const [name, changeName] = useState("");
  const navigate = useNavigate();

  const registerSubmit = (e) => {
    e.preventDefault();
    let registerObj = helpers.formParser(e.target.elements);
    axios
      .post("http://localhost:5000/user/register", registerObj)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          navigate("/login");
          return;
        }
        setRegisterError(res.data.message);
      })
      .catch((err) => console.error(err));
  };

  const handleOuterClick = (e) => {
    const formDiv = document.querySelector(".form-box");
    if (formDiv && !formDiv.contains(e.target)) {
      state.register = false;
    }
  };

  const toggleLoginLink= () => {
    state.register = false;
    state.login = true;
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleOuterClick}
    >
      <div className="wrapper">
        <div className="form-box">
          {registerError && <div className="error">{registerError}</div>}
          <h2 >Register</h2>
          <form onSubmit={registerSubmit}>
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
            <div className="input-box">
            <span className="icon">
                <FaGrin  size={22} />
              </span>
              {
                name === '' ?   <label >Display name:</label> : null            }
              <input
                type="text"
                name="username"
                onChange={(e) => changeName(e.target.value)}
                value={name}
                required
              />
            </div>
            <button type="submit" className="btn">
              Register
            </button>
          </form>
          <div className="login-register">
            <p>
              Already have an account?{" "}
              <a
              onClick={toggleLoginLink} className="rejister-link">
                Login
              </a>
            </p>
          </div>

          <div>
          <div className="flex justify-around my-2 mt-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/[0.5] cursor-pointer">
                <BsFacebook size={35}/>
              </div>
              <div className="w-10 h-10 rounded-full  flex items-center justify-center hover:bg-accent/[0.5] cursor-pointer">
               <AiFillGoogleCircle size={64} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
