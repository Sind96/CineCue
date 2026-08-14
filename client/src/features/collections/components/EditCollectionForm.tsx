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
            transition: Bounce,
          });

          onSuccess();
        },

        onError: (error) => {
          console.error("Error updating collection:", error);

          toast.error("Unable to update collection.", {
            position: "top-center",
            autoClose: 1500,
            transition: Bounce,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="collection-name"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Name
        </label>

        <input
          id="collection-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          disabled={updateMutation.isPending}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="collection-description"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Description
        </label>

        <textarea
          id="collection-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          disabled={updateMutation.isPending}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={updateMutation.isPending || name.trim().length === 0}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditCollectionForm;
