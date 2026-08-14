import { useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import AuthActions from "./AuthActions";
import Brand from "./Brand";
import { useTheme } from "../../features/theme/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import MobileSearch from "./MobileSearch";

const Navbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();

  const hideSearchBar =
    location.pathname === "/signin" || location.pathname === "/signup";

  const isAuthenticated = user !== null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Brand />

        {isAuthenticated && <NavLinks />}

        {!hideSearchBar && (
          <div className="hidden max-w-md flex-1 md:block">
            <SearchBar />
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {!hideSearchBar && <MobileSearch />}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <div className="hidden md:block">
            {!isAuthenticated && <AuthActions />}
            {isAuthenticated && <ProfileMenu />}
          </div>

          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
