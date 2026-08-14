import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";

const MobileMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-card">
          <nav className="flex flex-col">
            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-surface-elevated"
            >
              Home
            </Link>

            {user && (
              <>
                <Link
                  to="/watchlist"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-surface-elevated"
                >
                  Watchlist
                </Link>

                <Link
                  to="/collections"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-surface-elevated"
                >
                  Collections
                </Link>

                <div className="my-2 border-t border-border" />

                <Link
                  to="/settings"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-surface-elevated"
                >
                  Settings
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    void logout();
                  }}
                  className="rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-surface-elevated"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-surface-elevated"
                >
                  Sign Up
                </Link>

                <Link
                  to="/signin"
                  onClick={closeMenu}
                  className="mt-1 rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-accent"
                >
                  Sign In
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
