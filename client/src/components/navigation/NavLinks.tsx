import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      "text-sm font-medium transition-colors",
      isActive
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground",
    ].join(" ");

  return (
    <div className="hidden items-center gap-6 md:flex">
      <NavLink to="/" className={linkClasses}>
        Home
      </NavLink>

      <NavLink to="/watchlist" className={linkClasses}>
        Watchlist
      </NavLink>

      <NavLink to="/collections" className={linkClasses}>
        Collections
      </NavLink>
    </div>
  );
};

export default NavLinks;
