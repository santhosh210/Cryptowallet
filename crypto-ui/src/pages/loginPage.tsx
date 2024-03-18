import React, { useState } from "react";
import "./loginPage.css";
import logo from "../logo.png";

const Login: React.FC = () => {
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", emailPhone, password);
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h3 style={{ textAlign: "center" }}>Login</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          {/* <label htmlFor="emailPhone"></label> */}
          <input
            type="text"
            placeholder="Email or Phone:"
            id="emailPhone"
            name="emailPhone"
            value={emailPhone}
            onChange={(e) => setEmailPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="password"></label> */}
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="signupBar">
        <div className="forgot-password">
          <a href=" ">Forgot Password?</a>
        </div>
        <div className="sign-up">
          <p>
            <a href=" ">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
