import { X } from "lucide-react";
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Edit collection"
        className="relative w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close edit collection modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-muted-foreground transition hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 pr-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Edit Collection
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the collection name or description.
          </p>
        </div>

        <EditCollectionForm collection={collection} onSuccess={onClose} />
      </div>
    </div>
  );
};

export default EditCollectionModal;
