import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const ShoppingCart = () => {
  const { carts, setCarts } = useOutletContext();

  const [uniqueCarts, setUniqueCarts] = useState(
    carts
      .map((item) => ({
        ...item,
        value: carts.filter((c) => c.id === item.id).length,
      }))
      .filter(
        (cart, index, self) => index === self.findIndex((c) => c.id === cart.id)
      )
  );

  const calculateSubtotal = (list) =>
    list.reduce((total, item) => total + item.price * item.value, 0);

  const [subtotal, setSubtotal] = useState(() =>
    calculateSubtotal(uniqueCarts)
  );
  const [shipping, setShipping] = useState(() => subtotal * 0.01);
  const [tax, setTax] = useState(() => subtotal * 0.1);
  const [total, setTotal] = useState(() => subtotal + tax + shipping);

  const recalculateTotals = (updatedCart) => {
    const newSubtotal = calculateSubtotal(updatedCart);
    setSubtotal(newSubtotal);
    setShipping(newSubtotal * 0.01);
    setTax(newSubtotal * 0.1);
    setTotal(newSubtotal * 1.11);
  };

  const handleQuantityChange = (id, newValue) => {
    const updatedCart = uniqueCarts.map((item) =>
      item.id === id ? { ...item, value: parseInt(newValue) } : item
    );
    setUniqueCarts(updatedCart);
    recalculateTotals(updatedCart);
  };

  const checkout = () => {
    if (!total) return alert("Please add product to the cart!");

    setSubtotal(0);
    setShipping(0);
    setTax(0);
    setTotal(0);
    setCarts([]);
    setUniqueCarts([]);
    alert("Thank you!");
  };

  return (
    <div className="p-5 mt-12">
      <h1 className="text-4xl font-bold text-gray-900 my-7">Shopping Cart</h1>
      <div className="grid grid-cols-[2fr_1fr] gap-x-6">
        <div>
          {uniqueCarts.map((item) => (
            <div
              key={item.id}
              className="flex gap-x-5 py-4 border-t-2 border-gray-200"
            >
              <img
                className="max-w-full block min-w-60 max-h-60 object-contain mx-auto rounded-md"
                src={item.image}
                alt={item.title}
              />
              <div className="flex flex-col gap-x-2">
                <p className="text-base text-gray-900 font-medium">
                  {item.title}
                </p>
                <p className="text-gray-500 text-balance mt-1 mb-2">
                  {item.description}
                </p>
                <select
                  className="border-[1.5px] cursor-default outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 rounded-md border-gray-500 py-1.5 pr-2 pl-3 max-w-20 my-2"
                  name="quantity"
                  id="quantity"
                  value={item.value}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <p className="text-gray-900 font-semibold">
                  ${(item.price * item.value).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Order summary</h2>
          <div className="flex justify-between border-b-[1px] border-gray-300 py-4">
            <p className="text-gray-800">Subtotal</p>
            <p className="font-medium">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b-[1px] border-gray-300 py-4">
            <p className="text-gray-800">Shipping</p>
            <p className="font-medium">${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b-[1px] border-gray-300 py-4">
            <p className="text-gray-800">Tax</p>
            <p className="font-medium">${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between py-4">
            <p className="text-gray-800">Order total</p>
            <p className="font-medium">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => checkout()}
            className="cursor-pointer text-lg w-full mt-4 bg-indigo-600 hover:bg-indigo-700 font-semibold text-white p-2 px-4 rounded-md"
            type="button"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
