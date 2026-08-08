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
        theme: "dark",
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
            theme: "dark",
            transition: Bounce,
          });
        },

        onError: (error) => {
          console.error("Error creating collection:", error);

          toast.error("Unable to create collection. Please try again.", {
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-black/70 p-6 shadow-md"
    >
      <div>
        <label
          htmlFor="collection-name"
          className="mb-2 block text-sm font-medium text-white"
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
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="collection-description"
          className="mb-2 block text-sm font-medium text-white"
        >
          Description
        </label>

        <textarea
          id="collection-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Movies we want to watch together"
          rows={3}
          maxLength={500}
          disabled={createCollectionMutation.isPending}
          className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={createCollectionMutation.isPending}
        className="w-full rounded-lg bg-primary p-3 font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {createCollectionMutation.isPending
          ? "Creating collection..."
          : "Create collection"}
      </button>
    </form>
  );
};

export default CreateCollectionForm;
