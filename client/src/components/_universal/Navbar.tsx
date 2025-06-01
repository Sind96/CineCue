import NavBarItem from "./NavBar/NavBarItem";
import SearchBar from "./NavBar/SearchBar";
import SignUpAndSignIn from "./NavBar/SignUpAndSignIn";
import Title from "./NavBar/Title";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <div className="flex justify-between">
        <Title />
        <NavBarItem />
      </div>
      <SearchBar />
      <div className="flex justify-between">
        <SignUpAndSignIn />
      </div>
    </div>
  );
};

export default Navbar;
