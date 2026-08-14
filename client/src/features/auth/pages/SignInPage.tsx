import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navigation/Navbar";
import { useAuth } from "../hooks/useAuth";
import { Bounce, toast } from "react-toastify";

const SignInPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        email,
        password,
      });

      navigate("/");
    } catch (error) {
      console.log(`Error with handleSignIn:`, error);
      toast.error("Invalid Credentials", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
              Welcome Back
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Sign in to CineCue
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Continue building your watchlist and collections.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label
                htmlFor="signin-email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                id="signin-email"
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
                htmlFor="signin-password"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Password
              </label>

              <input
                id="signin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            First time?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary transition hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
