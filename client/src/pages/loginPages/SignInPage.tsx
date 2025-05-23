import { useNavigate } from "react-router";

const SignInPage = () => {
  const navigate = useNavigate();

  const signUpNow = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div>
        <p>
          Welcome<span>Back</span>
        </p>
        <p>Enter your credentials to login</p>
      </div>

      <form>
        <input type="text" placeholder="email@domain.com" />
        <input type="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>

      <div>
        <p>
          First time? <span onClick={signUpNow}>Sign up now!</span>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
