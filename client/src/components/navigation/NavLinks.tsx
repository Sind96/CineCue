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
      <Link
        to="/collections"
        className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
      >
        Collections
      </Link>
      <Link
        to="/update"
        className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
      >
        Settings
      </Link>
    </div>
  );
};

export default NavBarItem;
