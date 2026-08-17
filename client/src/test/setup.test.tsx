import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("client test setup", () => {
  it("renders content in jsdom", () => {
    render(<p>CineCue test</p>);

    expect(screen.getByText("CineCue test")).toBeInTheDocument();
  });
});
