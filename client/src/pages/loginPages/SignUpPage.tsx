import React, { useState } from "react";
import API from "../../services/axios.js";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/_Navbar.js";
import { Bounce, toast } from "react-toastify";

const SignUpPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    try {
      await API.post("/auth/register", { username, email, password });
      toast.success("Account created. Please log in.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      console.error(`Error with handleSignUp:`, error);
    }
  };

  return (
    <div>
      <Navbar />

      <main>
        <div>
          <h1>
            Sign<span>Up</span>
          </h1>
          <p>Create your account</p>

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
              autoComplete="email"
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

          <p>
            Already have an account? <Link to="/signin">Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
