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
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-picker-title"
    >
      <div>
        <div>
          <h2 id="collection-picker-title">Add to collection</h2>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close collection picker"
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
        />

        {collectionsQuery.isPending ? (
          <p>Loading collections...</p>
        ) : collectionsQuery.isError ? (
          <p>Unable to load collections.</p>
        ) : collections.length === 0 ? (
          <p>You have not created any collections yet.</p>
        ) : filteredCollections.length === 0 ? (
          <p>No collections match your search.</p>
        ) : (
          <ul>
            {filteredCollections.map((collection) => {
              const isSelected = selectedCollectionIds.includes(collection.id);

              return (
                <li key={collection.id}>
                  <button
                    type="button"
                    onClick={() => toggleCollection(collection.id)}
                    className="flex w-full items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 p-4 text-left transition hover:border-primary hover:bg-gray-800"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="h-4 w-4"
                    />
                    <p>{collection.name}</p>

                    {collection.description && <p>{collection.description}</p>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <button
          type="button"
          onClick={() => onSelect(selectedCollectionIds)}
          disabled={selectedCollectionIds.length === 0}
          className="mt-5 w-full rounded-lg bg-primary p-3 font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {selectedCollectionIds.length === 0
            ? "Select collections"
            : `Add to ${selectedCollectionIds.length} ${
                selectedCollectionIds.length === 1
                  ? "collection"
                  : "collections"
              }`}
        </button>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CollectionPickerModal;
