import { useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import NavLinks from "./NavLinks";
import SearchBar from "../NavBar/SearchBar";
import AuthActions from "./AuthActions";
import Brand from "./Brand";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const hideSearchBar =
    location.pathname === "/signin" || location.pathname === "/signup";

  const isAuthenticated = user !== null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-secondary bg-opacity-90 backdrop-blur-md shadow-sm">
      <nav className="max-w-8xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Brand />
          {isAuthenticated && <NavLinks />}
        </div>

        {!hideSearchBar && (
          <div className="flex-1 max-w-md hidden md:block">
            {" "}
            <SearchBar />
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isAuthenticated && <AuthActions />}
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
