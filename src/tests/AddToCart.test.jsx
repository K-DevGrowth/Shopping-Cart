import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AddToCart from "../components/AddToCart";

describe("AddToCart", () => {
  let setCarts, carts, item, addNotification;

  beforeEach(() => {
    setCarts = vi.fn();
    addNotification = vi.fn();
    carts = [];
    item = {
      id: 0,
      title: "Test Product",
      price: 28,
      image: "test.jpg",
      description: "Test description",
    };
  });

  it("renders Add to cart button", () => {
    render(
      <AddToCart
        carts={carts}
        setCarts={setCarts}
        item={item}
        addNotification={addNotification}
      />
    );
    expect(screen.getByText("Add to cart")).toBeInTheDocument();
  });

  it("calls setCarts and addNotifications with correct data when clicked", () => {
    render(
      <AddToCart
        carts={carts}
        setCarts={setCarts}
        item={item}
        addNotification={addNotification}
      />
    );

    const button = screen.getByText("Add to cart");
    fireEvent.click(button);

    expect(setCarts).toHaveBeenCalledWith([
      {
        id: item.id,
        value: 1,
        title: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
      },
    ]);

    expect(addNotification).toHaveBeenLastCalledWith(item);
  });
});
