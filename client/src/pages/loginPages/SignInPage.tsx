import { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      console.log(email, password);
    } catch (error) {
      console.log(`Error with handleSignIn:`, error);
    }
  };

  return (
    <div>
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
