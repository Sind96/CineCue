import { Link } from "react-router-dom";

const NavBarItem = () => {
  return (
    <div className="flex items-center gap-6">
      <Link
        to="/watchlist"
        className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
      >
        Watch List
      </Link>
    </div>
  );
};

export default NavBarItem;
