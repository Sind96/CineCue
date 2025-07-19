import NavBarItem from "./NavBarItem";
import SearchBar from "./SearchBar";
import SignUpAndSignIn from "./SignUpAndSignIn";
import Title from "./Title";

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
