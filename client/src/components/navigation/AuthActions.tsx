import { Link } from "react-router-dom";

const AuthActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/signup"
        className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-elevated"
      >
        Sign Up
      </Link>

      <Link
        to="/signin"
        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent"
      >
        Sign In
      </Link>
    </div>
  );
};

export default AuthActions;
