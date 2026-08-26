import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useCreateCollection } from "../hooks/useCreateCollection";

const CreateCollectionForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createCollectionMutation = useCreateCollection();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      toast.error("Collection name is required.", {
        position: "top-center",
        autoClose: 1500,
        transition: Bounce,
      });

      return;
    }

    createCollectionMutation.mutate(
      {
        name: trimmedName,
        description: trimmedDescription || undefined,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");

          toast.success("Collection created successfully.", {
            position: "top-center",
            autoClose: 1500,
            transition: Bounce,
          });
        },

        onError: (error) => {
          console.error("Error creating collection:", error);

          toast.error("Unable to create collection. Please try again.", {
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
          Collection name
        </label>

        <input
          id="collection-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Friday Night Movies"
          maxLength={100}
          disabled={createCollectionMutation.isPending}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
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
          placeholder="Movies we want to watch together"
          rows={4}
          maxLength={500}
          disabled={createCollectionMutation.isPending}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={createCollectionMutation.isPending}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createCollectionMutation.isPending
            ? "Creating collection..."
            : "Create Collection"}
        </button>
      </div>
    </form>
  );
};

export default CreateCollectionForm;
