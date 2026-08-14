import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Navbar from "../../../components/navigation/Navbar";
import CreateCollectionForm from "../components/CreateCollectionForm";
import { useCollections } from "../hooks/useCollections";
import { useDeleteCollection } from "../hooks/useDeleteCollection";
import { ScaleLoader } from "react-spinners";

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
          transition: Bounce,
        });
      },

      onError: (error) => {
        console.error("Error deleting collection:", error);

        toast.error("Unable to delete collection. Please try again.", {
          position: "top-center",
          autoClose: 1500,
          transition: Bounce,
        });
      },
    });
  };

  if (collectionsQuery.isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] w-full max-w-[1900px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScaleLoader color="var(--accent)" />

            <p className="mt-4 text-sm text-muted-foreground">
              Loading collections...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-[1900px] px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Your Library
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Your Collections
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Organise movies into lists for different moods, people or occasions.
          </p>
        </header>

        <section className="mb-12 rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-foreground">
              Create a Collection
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Start a new list and add movies whenever you find something worth
              saving.
            </p>
          </div>

          <CreateCollectionForm />
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                My Collections
              </h2>

              {!collectionsQuery.isError && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {collections.length === 1
                    ? "1 collection"
                    : `${collections.length} collections`}
                </p>
              )}
            </div>
          </div>

          {collectionsQuery.isError ? (
            <div className="rounded-2xl border border-border bg-surface p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                <span className="text-xl text-red-500">!</span>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-foreground">
                Collections unavailable
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                We couldn't load your collections. Please try again.
              </p>

              <button
                type="button"
                onClick={() => collectionsQuery.refetch()}
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
              >
                Try Again
              </button>
            </div>
          ) : collections.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 text-center">
              <h3 className="text-xl font-semibold text-foreground">
                No collections yet
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Create your first collection above and start building your own
                movie lists.
              </p>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {collections.map((collection) => (
                <li
                  key={collection.id}
                  className="group flex min-h-60 flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-surface-elevated hover:shadow-card"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        {collection.name}
                      </h3>

                      <span className="shrink-0 rounded-full bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">
                        {collection.visibility.toLowerCase()}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {collection.description ??
                        "No description has been added."}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <Link
                      to={`/collections/${collection.id}`}
                      className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                    >
                      Open Collection
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(collection.id)}
                      disabled={deleteCollectionMutation.isPending}
                      aria-label={`Delete ${collection.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
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
