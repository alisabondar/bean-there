import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import helpers from "../helpers";

export default function Login() {
  const [logError, setLogError] = useState("");
  const [email, changeEmail] = useState("");
  const [pass, changePass] = useState("");
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
    <div className="mt-[100px]">
      {logError.length ? logError : null}
      <form onSubmit={loginSubmit}>
        <div className="pb-5">
          <label>Email: </label>
          <input
            type="email"
            id="login-email"
            name="email"
            onChange={(e) => changeEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="pb-5">
          <label>Password: </label>
          <input
            type="text"
            id="login-password"
            name="password"
            onChange={(e) => changePass(e.target.value)}
            value={pass}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/register">Register</a>
    </div>
  );
}
