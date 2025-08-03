import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import NavBarItem from "./NavBarItem";
import SearchBar from "./SearchBar";
import SignUpAndSignIn from "./SignUpAndSignIn";
import Title from "./Title";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  const hideSearchBar =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="flex justify-between">
      <div className="flex justify-between">
        <Title />
        {isAuthenticated && <NavBarItem />}
      </div>
      {!hideSearchBar && <SearchBar />}
      {!isAuthenticated && (
        <div className="flex justify-between">
          <SignUpAndSignIn />
        </div>
      )}
      {isAuthenticated && (
        <>
          <p>Hello {user?.username}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
