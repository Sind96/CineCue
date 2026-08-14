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

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 409) {
          toast.error("That email is already registered.", {
            position: "top-center",
            autoClose: 1500,
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
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-card">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Join CineCue
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Start saving movies and building your own collections.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label
                htmlFor="signup-name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Name
              </label>

              <input
                id="signup-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                id="signup-email"
                type="email"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Password
              </label>

              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label
                htmlFor="signup-confirm-password"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Confirm password
              </label>

              <input
                id="signup-confirm-password"
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-primary transition hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
