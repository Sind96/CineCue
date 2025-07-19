import React, { useState } from "react";
import API from "../../services/axios.js";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/_Navbar.js";

const SignUpPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await API.post("/auth/register", { username, email, password });
      navigate("/signin");
    } catch (error) {
      console.error(`Error with handleSignUp:`, error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <p>
          Sign<span>Up</span>
        </p>
        <p>Create your account</p>
      </div>

      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="current-email"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="confirm-password"
        />
        <button type="submit">Sign Up</button>
      </form>

      <div>
        <p>
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
