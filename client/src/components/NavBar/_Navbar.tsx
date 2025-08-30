import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import NavBarItem from "./NavBarItem";
import SearchBar from "./SearchBar";
import SignUpAndSignIn from "./SignUpAndSignIn";
import Title from "./Title";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const hideSearchBar =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-secondary bg-opacity-90 backdrop-blur-md shadow-sm">
      <nav className="max-w-8xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Title />
          {isAuthenticated && <NavBarItem />}
        </div>

        {!hideSearchBar && (
          <div className="flex-1 max-w-md hidden md:block">
            {" "}
            <SearchBar />
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isAuthenticated && <SignUpAndSignIn />}
          {isAuthenticated && (
            <>
              {/* <p className="hidden sm:block text-sm text-gray-300">
                Welcome back{" "}
                <span className="text-white font-semibold">
                  {" "}
                  {user?.username}
                </span>
              </p> */}
              <button
                onClick={logout}
                className="bg-primary hover:bg-accent px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
