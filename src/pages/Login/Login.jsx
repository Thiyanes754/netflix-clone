// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { login, signup } from '../../firebase';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();

    if (!email || !password || (signState === "Sign Up" && !name)) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }

      // Reset form after success
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Auth Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="Netflix Logo" />

      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit">{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <p className="help-text">Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up now</span>
            </p>
          ) : (
            <p>
              Already a member?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In here</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
