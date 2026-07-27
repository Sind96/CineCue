import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/_Navbar.js";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../features/auth/hooks/useAuth.js";

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
          {/* Heading */}
          <h1 className="text-3xl font-bold mb-2">
            Welcome<span className="text-primary">Back</span>
          </h1>
          <p className="text-gray-300 mb-6">Enter your credentials to login</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="email@domain.com"
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
              autoComplete="current-password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary transition"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-accent transition-colors duration-200 p-3 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            First time?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up now!
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
