import { useAuth } from "../../hooks/AuthContext";
import NavBarItem from "./NavBarItem";
import SearchBar from "./SearchBar";
import SignUpAndSignIn from "./SignUpAndSignIn";
import Title from "./Title";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="flex justify-between">
      <div className="flex justify-between">
        <Title />
        {isAuthenticated && <NavBarItem />}
      </div>
      <SearchBar />
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
