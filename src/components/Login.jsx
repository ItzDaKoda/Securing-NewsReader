import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(username, password);
    if (!result.ok) {
      setError(result.message || "Login failed. Please try again.");
      return;
    }

    navigate("/saved");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to NewsReader</h2>
        <p className="login-subtitle">Access your personalized saved articles</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Try "regular" or "admin"'
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Admin password is "password"'
            />
          </div>

          <button type="submit" className="btn btn-primary login-button">
            Login
          </button>
        </form>

        <div className="demo-accounts">
          <p className="demo-title">Demo Accounts (for testing):</p>
          <p>
            <strong>Regular:</strong> any username + any password
          </p>
          <p>
            <strong>Admin:</strong> username <code>admin</code> + password{" "}
            <code>password</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;