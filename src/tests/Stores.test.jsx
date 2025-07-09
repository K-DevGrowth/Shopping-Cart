import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Stores from "../components/Stores";

const mockItems = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    image: "product1.jpg",
    description: "A nice product",
  },
];

let mockCarts = [];
const mockSetCarts = vi.fn((updateFn) => {
  if (typeof updateFn === "function") {
    mockCarts = updateFn(mockCarts);
  } else {
    mockCarts = updateFn;
  }
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(() => ({
      items: mockItems,
      carts: mockCarts,
      setCarts: mockSetCarts,
    })),
  };
});

describe("Stores", () => {
  beforeEach(() => {
    mockCarts = [];
    mockSetCarts.mockClear();
  });

  it("renders product correctly", () => {
    render(<Stores />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add to cart" })
    ).toBeInTheDocument();
  });

  it("should call setCarts and show notification on Add to cart", async () => {
    render(<Stores />);
    const button = screen.getByRole("button", { name: "Add to cart" });
    fireEvent.click(button);

    expect(mockSetCarts).toHaveBeenCalled();

    await waitFor(() =>
      expect(screen.getByText("Successfully added!")).toBeInTheDocument()
    );
    expect(screen.getByText("Product 1 added")).toBeInTheDocument();
  });

   it("should remove notification on close click", async () => {
    render(<Stores />);
    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    const closeButton = await screen.findByRole("button", {
      name: /close/i,
    });
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(
        screen.queryByText("Successfully added!")
      ).not.toBeInTheDocument()
    );
  });
});
console.log("mockCarts:", mockCarts);
