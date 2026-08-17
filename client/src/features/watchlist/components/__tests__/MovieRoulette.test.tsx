import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MovieRoulette from "../MovieRoulette";

const movies = [
  {
    imdbId: "tt0816692",
    title: "Interstellar",
    posterUrl: "https://example.com/interstellar.jpg",
  },
  {
    imdbId: "tt1375666",
    title: "Inception",
    posterUrl: "https://example.com/inception.jpg",
  },
  {
    imdbId: "tt0133093",
    title: "The Matrix",
    posterUrl: "https://example.com/matrix.jpg",
  },
];

beforeEach(() => {
  vi.useFakeTimers();

  vi.spyOn(Math, "random").mockReturnValue(0);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("MovieRoulette", () => {
  it("starts with three spins available", () => {
    render(
      <MemoryRouter>
        <MovieRoulette movies={movies} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: /spin the roulette/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("3 spins remaining")).toBeInTheDocument();

    expect(screen.getByText("Can't decide what to watch?")).toBeInTheDocument();
  });

  it("selects a movie after a completed spin", async () => {
    render(
      <MemoryRouter>
        <MovieRoulette movies={movies} />
      </MemoryRouter>,
    );

    const spinButton = screen.getByRole("button", {
      name: /spin the roulette/i,
    });

    fireEvent.click(spinButton);

    expect(screen.getByRole("button", { name: /choosing/i })).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.getByText("2 spins remaining")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /spin again/i })).toBeEnabled();
  });

  it("disables spinning after three completed spins", () => {
    render(
      <MemoryRouter>
        <MovieRoulette movies={movies} />
      </MemoryRouter>,
    );

    const firstSpinButton = screen.getByRole("button", {
      name: /spin the roulette/i,
    });

    fireEvent.click(firstSpinButton);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /spin again/i,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /spin again/i,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const noSpinsButton = screen.getByRole("button", {
      name: /no spins left/i,
    });

    expect(noSpinsButton).toBeDisabled();
    expect(screen.getByText("0 spins remaining")).toBeInTheDocument();
  });
});
