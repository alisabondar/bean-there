import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import helpers from "../helpers";

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
      .post("http://localhost:5001/auth/register", registerObj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
          "Access-Control-Allow-Credentials": "true",
        },
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
          return;
        }
        setRegisterError(res.data.message);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="mt-[100px]">
      {registerError.length ? registerError : null}
      <form onSubmit={registerSubmit}>
        <div className="pb-5">
          <label>Email: </label>
          <input
            type="email"
            className="register-email"
            name="email"
            onChange={(e) => changeEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="pb-5">
          <label>Name: </label>
          <input
            type="text"
            className="register-name"
            name="username"
            onChange={(e) => changeName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="pb-5">
          <label>Password: </label>
          <input
            type="text"
            className="register-password"
            name="password"
            onChange={(e) => changePass(e.target.value)}
            value={pass}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <a href="/login">Login</a>
    </div>
  );
}
