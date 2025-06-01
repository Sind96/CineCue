import { Link } from "react-router-dom";

const SignUpAndSignIn = () => {
  return (
    <div>
      <button>
        <Link to="/signup">Sign Up</Link>
      </button>
      <button>
        <Link to="/signin">Sign Up</Link>
      </button>
    </div>
  );
};

export default SignUpAndSignIn;
