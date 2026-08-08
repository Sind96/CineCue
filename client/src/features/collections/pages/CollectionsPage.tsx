import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Navbar from "../../../components/NavBar/_Navbar";
import CreateCollectionForm from "../components/CreateCollectionForm";
import { useCollections } from "../hooks/useCollections";
import { useDeleteCollection } from "../hooks/useDeleteCollection";

const CollectionsPage = () => {
  const collectionsQuery = useCollections();
  const deleteCollectionMutation = useDeleteCollection();

  const collections = collectionsQuery.data ?? [];

  const handleDelete = (collectionId: string) => {
    deleteCollectionMutation.mutate(collectionId, {
      onSuccess: () => {
        toast.success("Collection deleted successfully.", {
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      },

      onError: (error) => {
        console.error("Error deleting collection:", error);

        toast.error("Unable to delete collection. Please try again.", {
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      },
    });
  };

  if (collectionsQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        Loading collections...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Your Collections</h1>

          <p className="mt-2 text-gray-400">
            Organise movies into lists for different moods, people or occasions.
          </p>
        </div>

        <section className="mb-12">
          <CreateCollectionForm />
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-white">
            My Collections
          </h2>

          {collectionsQuery.isError ? (
            <p className="text-center text-red-500">
              Unable to load your collections. Please try again.
            </p>
          ) : collections.length === 0 ? (
            <div className="rounded-xl border border-gray-800 bg-black/40 p-10 text-center">
              <p className="text-lg text-gray-300">
                You have not created any collections yet.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Use the form above to create your first one.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <li
                  key={collection.id}
                  className="flex min-h-56 flex-col justify-between rounded-xl border border-gray-800 bg-black/60 p-6 shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-white">
                        {collection.name}
                      </h3>

                      <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                        {collection.visibility.toLowerCase()}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                      {collection.description ??
                        "No description has been added."}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <Link
                      to={`/collections/${collection.id}`}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                    >
                      Open collection
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(collection.id)}
                      disabled={deleteCollectionMutation.isPending}
                      aria-label={`Delete ${collection.name}`}
                      className="rounded-lg bg-red-600/80 p-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default CollectionsPage;
