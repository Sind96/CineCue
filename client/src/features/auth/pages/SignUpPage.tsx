import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navigation/Navbar";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { register } = useAuth();

  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });

      return;
    }

    try {
      await register({
        name,
        email,
        password,
      });

      toast.success("Account created. Please log in.", {
        position: "top-center",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 409) {
          toast.error("That email is already registered.", {
            position: "top-center",
            autoClose: 1500,
            theme: "light",
            transition: Bounce,
          });

          return;
        }

        if (status === 400) {
          toast.error(
            typeof message === "string"
              ? message
              : "Please check your registration details.",
            {
              position: "top-center",
              autoClose: 1500,
              theme: "light",
              transition: Bounce,
            },
          );

          return;
        }
      }

      console.error("Error with handleSignUp:", error);

      toast.error("Unable to create your account. Please try again.", {
        position: "top-center",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary font-sans text-white">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="bg-black bg-opacity-70 p-8 rounded-xl shadow-card max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2">
            Sign<span className="text-primary">Up</span>
          </h1>
          <p className="text-gray-300 mb-6">Create your account</p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoComplete="name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary transition"
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary transition"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary transition"
            />
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary transition"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-accent transition-colors duration-200 p-3 rounded-lg font-semibold"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
