import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useUpdateCollection } from "../hooks/useUpdateCollection";

type EditCollectionFormProps = {
  collection: {
    id: string;
    name: string;
    description?: string | null;
  };
  onSuccess: () => void;
};

const EditCollectionForm = ({
  collection,
  onSuccess,
}: EditCollectionFormProps) => {
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description ?? "");

  const updateMutation = useUpdateCollection();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateMutation.mutate(
      {
        collectionId: collection.id,
        input: {
          name: name.trim(),
          description: description.trim(),
        },
      },
      {
        onSuccess: () => {
          toast.success("Collection updated.", {
            position: "top-center",
            autoClose: 1500,
            theme: "dark",
            transition: Bounce,
          });

          onSuccess();
        },

        onError: (error) => {
          console.error("Error updating collection:", error);

          toast.error("Unable to update collection.", {
            position: "top-center",
            autoClose: 1500,
            theme: "dark",
            transition: Bounce,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="collection-name"
          className="mb-1 block text-sm font-medium text-gray-300"
        >
          Name
        </label>

        <input
          id="collection-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-white outline-none focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="collection-description"
          className="mb-1 block text-sm font-medium text-gray-300"
        >
          Description
        </label>

        <textarea
          id="collection-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          className="w-full resize-none rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-white outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={updateMutation.isPending || name.trim().length === 0}
        className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        {updateMutation.isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditCollectionForm;
