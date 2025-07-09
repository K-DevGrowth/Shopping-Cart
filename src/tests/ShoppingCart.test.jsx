import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ShoppingCart from "../components/ShoppingCart";

let mockCartWithItems = {
  carts: [
    {
      id: 1,
      title: "Book",
      price: 5,
      image: "book.jpg",
      description: "self-help book",
    },
    {
      id: 1,
      title: "Book",
      price: 5,
      image: "book.jpg",
      description: "self-help book",
    },
    {
      id: 2,
      title: "Egg",
      price: 2,
      image: "egg.jpg",
      description: "chicken eggs",
    },
  ],
  setCarts: vi.fn(),
};

let mockCartEmpty = {
  carts: [],
  setCarts: vi.fn(),
};

let mockContext = mockCartWithItems;

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => mockContext,
  };
});

describe("ShoppingCart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
    mockContext = mockCartWithItems;
  });

  it("renders cart items and order summary", () => {
    render(<ShoppingCart />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Book")).toBeInTheDocument();
    expect(screen.getByText("Egg")).toBeInTheDocument();
    expect(screen.getByText("self-help book")).toBeInTheDocument();
    expect(screen.getByText("Order summary")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Tax")).toBeInTheDocument();
    expect(screen.getByText("Order total")).toBeInTheDocument();
  });

  it("updates quality and recalculates totals", () => {
    render(<ShoppingCart />);
    const select = screen.getAllByRole("combobox")[0];
    fireEvent.change(select, { target: { value: "3" } });

    expect(screen.getByText("$17.00")).toBeInTheDocument();
    expect(screen.getByText("$0.17")).toBeInTheDocument();
    expect(screen.getByText("$1.70")).toBeInTheDocument();
    expect(screen.getByText("$18.87")).toBeInTheDocument();
  });

  it("shows thank you alert on checout when cart has items", () => {
    render(<ShoppingCart />);
    fireEvent.click(screen.getByText("Checkout"));
    expect(window.alert).toHaveBeenCalledWith("Thank you!");
    expect(mockContext.setCarts).toHaveBeenCalledWith([]);
  });

  it("should not render cart items when it is empty", () => {
    mockContext = mockCartEmpty;
    render(<ShoppingCart />);
    fireEvent.click(screen.getByText("Checkout"));
    expect(window.alert).toHaveBeenCalledWith(
      "Please add product to the cart!"
    );
  });
});
