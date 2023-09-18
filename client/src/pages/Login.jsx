import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import helpers from "../helpers";

export default function Login() {
  const [logError, setLogError] = useState("");
  const [email, changeEmail] = useState("");
  const [pass, changePass] = useState("");
  const [username, changeUser] = useState("");
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    let loginObj = helpers.formParser(e.target.elements);
    axios
      .post("http://localhost:5001/auth/login", loginObj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
          "Access-Control-Allow-Credentials": "true",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/");
          return;
        }
        setLogError(res.data.message);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {logError.length ? logError : null}
      <h1 className="text-2xl">Login</h1>
      <div className="flex flex-col">
        <form
          onSubmit={loginSubmit}
          className="flex flex-col items-start px-2 py-4 w-[25rem]"
        >
          <label className="py-1">Email: </label>
          <input
            className="px-2 py-1 mt-1 mb-2 bg-[black]/[0.2] border-b-2 focus:bg-[black]/[0.6] focus:outline-none w-[100%]"
            type="email"
            id="login-email"
            name="email"
            onChange={(e) => changeEmail(e.target.value)}
            value={email}
            placeholder="Type your email"
            required
          />
          <label className="px-2 py-1">Password: </label>
          <input
            className="px-2 py-1 mt-1 mb-2 bg-[black]/[0.2] border-b-2 focus:bg-[black]/[0.6] focus:outline-none w-[100%]"
            type="text"
            id="login-password"
            name="password"
            onChange={(e) => changePass(e.target.value)}
            value={pass}
            placeholder="Type your password"
            required
          />
          <span className="self-end italic">Forgot password?</span>
          <button
            className="self-center mt-5 mb-1 w-[75%] border px-4 py-2 rounded-md hover:bg-[#61493C]/[0.8]"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="self-center text-center">
          <h3>Or Sign Up Using</h3>
          <div className="flex justify-around my-2">
            <div className="w-[50px] h-[50px] rounded-full border flex items-center justify-center hover:bg-[#61493C]/[0.8]">
              <span>G</span>
            </div>
            <div className="w-[50px] h-[50px] rounded-full border flex items-center justify-center hover:bg-[#61493C]/[0.8]">
              <span>F</span>
            </div>
          </div>
        </div>
        <a
          className="self-center mt-4 border px-4 py-1 rounded-md hover:bg-[#61493C]/[0.8]"
          href="/register"
        >
          Not a Member? Register Here
        </a>
      </div>
    </div>
  );
}
