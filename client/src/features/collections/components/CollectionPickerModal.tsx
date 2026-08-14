import { useEffect, useState } from "react";
import { useCollections } from "../hooks/useCollections";

type CollectionPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (collectionIds: string[]) => void;
};

const CollectionPickerModal = ({
  isOpen,
  onClose,
  onSelect,
}: CollectionPickerModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>(
    [],
  );

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setSelectedCollectionIds([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const toggleCollection = (collectionId: string) => {
    setSelectedCollectionIds((currentIds) =>
      currentIds.includes(collectionId)
        ? currentIds.filter((id) => id !== collectionId)
        : [...currentIds, collectionId],
    );
  };

  const collectionsQuery = useCollections();
  const collections = collectionsQuery.data ?? [];

  const normalisedSearch = searchTerm.trim().toLowerCase();

  const filteredCollections = normalisedSearch
    ? collections.filter((collection) =>
        collection.name.toLowerCase().includes(normalisedSearch),
      )
    : collections;

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add movie to collection"
        className="relative w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Add to Collection
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Choose one or more collections for this movie.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close collection picker"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-muted-foreground transition hover:text-foreground"
          >
            ×
          </button>
        </div>

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search collections..."
          autoFocus
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        <div className="mt-5">
          {collectionsQuery.isPending ? (
            <div className="rounded-xl border border-border bg-background p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Loading collections...
              </p>
            </div>
          ) : collectionsQuery.isError ? (
            <div className="rounded-xl border border-border bg-background p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <span className="text-red-500">!</span>
              </div>

              <p className="mt-3 text-sm font-medium text-foreground">
                Unable to load collections
              </p>

              <button
                type="button"
                onClick={() => collectionsQuery.refetch()}
                className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent"
              >
                Try Again
              </button>
            </div>
          ) : collections.length === 0 ? (
            <div className="rounded-xl border border-border bg-background p-6 text-center">
              <p className="text-sm font-medium text-foreground">
                No collections yet
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Create a collection first, then come back to add this movie.
              </p>
            </div>
          ) : filteredCollections.length === 0 ? (
            <div className="rounded-xl border border-border bg-background p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No collections match your search.
              </p>
            </div>
          ) : (
            <ul className="max-h-72 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
              {filteredCollections.map((collection) => {
                const isSelected = selectedCollectionIds.includes(
                  collection.id,
                );

                return (
                  <li key={collection.id}>
                    <button
                      type="button"
                      onClick={() => toggleCollection(collection.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:bg-surface-elevated"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="mt-1 h-4 w-4"
                      />

                      <div className="min-w-0">
                        <p className="font-medium text-foreground">
                          {collection.name}
                        </p>

                        {collection.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {collection.description}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-elevated"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSelect(selectedCollectionIds)}
            disabled={selectedCollectionIds.length === 0}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {selectedCollectionIds.length === 0
              ? "Select Collections"
              : `Add to ${selectedCollectionIds.length} ${
                  selectedCollectionIds.length === 1
                    ? "Collection"
                    : "Collections"
                }`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionPickerModal;
