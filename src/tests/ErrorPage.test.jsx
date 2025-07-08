import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import { expect } from "vitest";

describe("ErrorPage", () => {
  it("renders 404 message and 'Go back home' link", async () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /page not found/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sorry, we couldn't find the page you're looking for.")
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /go back home/i })).toBeInTheDocument();
  });
});
