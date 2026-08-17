import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CollectionPickerModal from "../CollectionPickerModal";
import { useCollections } from "../../hooks/useCollections";

vi.mock("../../hooks/useCollections", () => ({
  useCollections: vi.fn(),
}));

const collections = [
  {
    id: "collection-1",
    name: "Friday Night Movies",
    description: "Movies to watch on Friday",
    visibility: "PRIVATE",
  },
  {
    id: "collection-2",
    name: "Date Night",
    description: "Movies to watch together",
    visibility: "PRIVATE",
  },
];

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(useCollections).mockReturnValue({
    data: collections,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  } as never);
});

describe("CollectionPickerModal", () => {
  it("renders nothing when the modal is closed", () => {
    render(
      <CollectionPickerModal
        isOpen={false}
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("dialog", {
        name: /add movie to collection/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("allows a collection to be selected and submitted", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CollectionPickerModal
        isOpen={true}
        onClose={vi.fn()}
        onSelect={onSelect}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /friday night movies/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: /add to 1 collection/i,
      }),
    ).toBeEnabled();

    await user.click(
      screen.getByRole("button", {
        name: /add to 1 collection/i,
      }),
    );

    expect(onSelect).toHaveBeenCalledWith(["collection-1"]);
  });

  it("filters collections using the search input", async () => {
    const user = userEvent.setup();

    render(
      <CollectionPickerModal
        isOpen={true}
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Search collections...");

    await user.type(searchInput, "date");

    expect(screen.getByText("Date Night")).toBeInTheDocument();

    expect(screen.queryByText("Friday Night Movies")).not.toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();

    render(
      <CollectionPickerModal
        isOpen={true}
        onClose={onClose}
        onSelect={vi.fn()}
      />,
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows a loading state while collections are being fetched", () => {
    vi.mocked(useCollections).mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      refetch: vi.fn(),
    } as never);

    render(
      <CollectionPickerModal
        isOpen={true}
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText("Loading collections...")).toBeInTheDocument();
  });

  it("shows an error state and retries when Try Again is clicked", async () => {
    const user = userEvent.setup();
    const refetch = vi.fn();

    vi.mocked(useCollections).mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      refetch,
    } as never);

    render(
      <CollectionPickerModal
        isOpen={true}
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText("Unable to load collections")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /try again/i,
      }),
    );

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
