import { useState } from "react";
import API from "../../api/axios.js";
import { Link } from "react-router-dom";
import Navbar from "../../components/_universal/NavBar/_Navbar";
import { useNavigate } from "react-router";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/login", { email, password });
      navigate("/");
    } catch (error) {
      console.log(`Error with handleSignIn:`, error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <p>
          Welcome<span>Back</span>
        </p>
        <p>Enter your credentials to login</p>
      </div>

      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="email@domain.com"
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
        <button type="submit">Login</button>
      </form>

      <div>
        <p>
          First time? <Link to="/signup">Sign up now!</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
