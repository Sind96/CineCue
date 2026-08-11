import EditCollectionForm from "./EditCollectionForm";

type EditCollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  collection: {
    id: string;
    name: string;
    description?: string | null;
  };
};

const EditCollectionModal = ({
  isOpen,
  onClose,
  collection,
}: EditCollectionModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gray-950 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-lg text-white transition hover:bg-black"
          aria-label="Close edit collection modal"
        >
          ×
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Collection</h2>

          <p className="mt-2 text-sm text-gray-400">
            Update the collection name or description.
          </p>
        </div>

        <EditCollectionForm collection={collection} onSuccess={onClose} />
      </div>
    </div>
  );
};

export default EditCollectionModal;
