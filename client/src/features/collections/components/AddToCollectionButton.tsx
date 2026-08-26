import { useState } from "react";
import CollectionPickerModal from "./CollectionPickerModal";
import { useAddMovieToCollection } from "../hooks/useAddMovieToCollection";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

type AddToCollectionButtonProps = {
  imdbId: string;
  title: string;
  year?: number;
  posterUrl?: string;
  overview?: string;
  runtimeMinutes?: number;
  genres: string[];
  externalSource: string;
};

const AddToCollectionButton = ({
  imdbId,
  title,
  year,
  posterUrl,
  overview,
  runtimeMinutes,
  genres,
  externalSource,
}: AddToCollectionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const addMovieMutation = useAddMovieToCollection();
  const navigate = useNavigate();

  const handleCollectionSelect = async (collectionIds: string[]) => {
    try {
      const results = await Promise.allSettled(
        collectionIds.map((collectionId) =>
          addMovieMutation.mutateAsync({
            collectionId,
            input: {
              imdbId,
              title,
              year,
              posterUrl,
              overview,
              runtimeMinutes,
              genres,
              externalSource,
            },
          }),
        ),
      );

      const successfulAdds = results.filter(
        (result) => result.status === "fulfilled",
      );

      const failedAdds = results.filter(
        (result) => result.status === "rejected",
      );

      const successCount = successfulAdds.length;
      const failureCount = failedAdds.length;

      if (successCount > 0 && failureCount === 0) {
        setIsOpen(false);

        toast.success(
          `Movie added to ${successCount} ${
            successCount === 1 ? "collection" : "collections"
          }.`,
          {
            position: "top-center",
            autoClose: 1500,
            transition: Bounce,
          },
        );

        return;
      }

      if (successCount > 0 && failureCount > 0) {
        setIsOpen(false);

        toast.info(
          `Movie added to ${successCount} ${
            successCount === 1 ? "collection" : "collections"
          }, but failed for ${failureCount}.`,
          {
            position: "top-center",
            autoClose: 2000,
            transition: Bounce,
          },
        );

        return;
      }

      if (successCount === 0 && failureCount > 0) {
        toast.error("Unable to add movie to the selected collections.", {
          position: "top-center",
          autoClose: 2000,
          transition: Bounce,
        });

        return;
      }

      setIsOpen(false);

      toast.success(
        `Movie added to ${collectionIds.length} ${
          collectionIds.length === 1 ? "collection" : "collections"
        }.`,
        {
          position: "top-center",
          autoClose: 1500,
          transition: Bounce,
        },
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.info("This movie already exists in one of those collections.", {
          position: "top-center",
          autoClose: 1500,
          transition: Bounce,
        });

        return;
      }

      console.error("Error adding movie to collections:", error);

      toast.error("Unable to add movie to collections.", {
        position: "top-center",
        autoClose: 1500,
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!user) {
            navigate("/signin");
            return;
          }

          setIsOpen(true);
        }}
        disabled={addMovieMutation.isPending}
        className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-elevated disabled:cursor-not-allowed disabled:opacity-60"
      >
        {addMovieMutation.isPending ? "Adding..." : "Add to Collection"}
      </button>

      <CollectionPickerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleCollectionSelect}
      />
    </>
  );
};

export default AddToCollectionButton;
