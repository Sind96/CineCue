import { Link } from "react-router-dom";

const SignUpAndSignIn = () => {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/signup"
        className="bg-primary hover:bg-accent px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
      >
        Sign Up
      </Link>

      <Link
        to="/signin"
        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
      >
        Sign In
      </Link>
    </div>
  );
};

export default SignUpAndSignIn;
