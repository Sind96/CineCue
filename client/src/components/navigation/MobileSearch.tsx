import { useState } from "react";
import { Search, X } from "lucide-react";
import SearchBar from "./SearchBar";

const MobileSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close movie search" : "Open movie search"}
        aria-expanded={isOpen}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full w-full border-b border-border bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden">
          <SearchBar />
        </div>
      )}
    </>
  );
};

export default MobileSearch;
