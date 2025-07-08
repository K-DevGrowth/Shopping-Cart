import { useOutletContext } from "react-router-dom";
import AddToCart from "./AddToCart";
import { useState } from "react";

const Stores = () => {
  const { items, carts, setCarts } = useOutletContext();
  const [notifications, setNotifications] = useState([]);

  const addNotification = (item) => {
    const id = Date.now();
    const newNotifications = { id, title: item.title };
    setNotifications((prev) => [...prev, newNotifications]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <>
      <div className="fixed top-20 right-5 z-50 flex flex-col gap-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex w-96 px-4 py-2 rounded-md bg-white border border-gray-300 shadow-md"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <img src="./public/icon.svg" alt="icon" className="w-5 h-5" />
                <p className="text-gray-900 font-medium">Successfully added!</p>
              </div>
              <p className="text-gray-500 text-sm mt-1">{n.title}</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setNotifications((prev) => prev.filter((x) => x.id !== n.id))
              }
              className="text-gray-500 hover:text-black ml-2"
            >
              <img
                src="./public/icon-close.svg"
                alt="close"
                className="w-4 h-4"
              />
            </button>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 sm:gap-x-2 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 xl:grid-cols-4 xl:gap-x-8 gap-y-4 mt-30">
        {items.map((item) => (
          <div
            key={item.id}
            className="mx-auto w-[250px] flex flex-col items-center p-1"
          >
            <img
              className="max-w-full block min-w-60 h-60 object-contain mx-auto rounded-md"
              src={item.image}
              alt={item.title}
            />
            <div className="flex justify-between h-10 gap-x-2">
              <p className="text-base">
                {item.title.length > 50
                  ? item.title.slice(0, 40) + "..."
                  : item.title}
              </p>
              <p className="text-gray-500 font-medium">${item.price}</p>
            </div>
            <div className="grid">
              <AddToCart
                item={item}
                carts={carts}
                setCarts={setCarts}
                addNotification={addNotification}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stores;
