import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, vi, it } from "vitest";
import HomePage from "../components/HomePage";

const setActive = vi.fn();

vi.mock("react-router-dom", async (importOrginal) => {
  const mod = await importOrginal();
  return {
    ...mod,
    useOutletContext: () => ({ setActive }),
  };
});

describe("HomePage components", () => {
  beforeEach(() => {
    setActive.mockClear();
  });

  it("renders heading and description", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /new arrivals are here/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/The new arrivals have, well, newly arrived./i)
    ).toBeInTheDocument();
  });

  it("triggers setActive when Shop new arrivals is clicked", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const button = screen.getByText("Shop New Arrivals");
    fireEvent.click(button);

    expect(setActive).toHaveBeenCalledWith("stores");
  });

  it("navigations to stores on link click", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Shop New Arrivals" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/stores");
  });
});
