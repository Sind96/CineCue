import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RequireAuth from "../RequireAuth";
import { useAuth } from "../../hooks/useAuth";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("RequireAuth", () => {
  it("shows a loading message while authentication is being checked", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      authLoading: true,
    } as never);

    render(
      <MemoryRouter>
        <RequireAuth>
          <p>Protected content</p>
        </RequireAuth>
      </MemoryRouter>,
    );

    expect(screen.getByText("Checking your session...")).toBeInTheDocument();

    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("redirects unauthenticated users to the sign in page", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      authLoading: false,
    } as never);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <p>Protected content</p>
              </RequireAuth>
            }
          />

          <Route path="/signin" element={<p>Sign in page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Sign in page")).toBeInTheDocument();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("renders protected content for authenticated users", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        id: "user-123",
        name: "Sindhu",
        email: "sindhu@example.com",
      },
      authLoading: false,
    } as never);

    render(
      <MemoryRouter>
        <RequireAuth>
          <p>Protected content</p>
        </RequireAuth>
      </MemoryRouter>,
    );

    expect(screen.getByText("Protected content")).toBeInTheDocument();

    expect(
      screen.queryByText("Checking your session..."),
    ).not.toBeInTheDocument();
  });
});
