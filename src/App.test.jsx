import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 10,
    image: "image1.jpg",
    description: "desc",
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProducts),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("App component", () => {
  it("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders navigations and header", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/k/i)).toBeInTheDocument();
    expect(screen.getByText(/dev\./i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Homepages" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Stores" })).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles fetch error", async () => {
    vi.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch failed"))
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});
