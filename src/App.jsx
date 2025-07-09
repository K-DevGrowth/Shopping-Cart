import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const App = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => setItems(res))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-lg font-semibold">Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  return (
    <>
      <header className="bg-gray-800 fixed top-0 w-full text-gray-300 p-5 text-lg font-semibold">
        <nav className="flex justify-between">
          <h1 className="font-bold text-2xl cursor-pointer">
            <span className="text-indigo-500">K</span>dev.
          </h1>
          <div className="flex lg:gap-x-6 gap-x-0 self-center text-base lg:text-lg">
            <Link
              onClick={() => setActive("")}
              className={`${
                !active
                  ? "bg-gray-900 font-medium text-white"
                  : "hover:bg-gray-700"
              } transition-all px-3 py-2 rounded-md`}
              to="/"
            >
              Homepages
            </Link>
            <Link
              onClick={() => setActive("stores")}
              className={`${
                active === "stores"
                  ? "bg-gray-900 font-medium text-white"
                  : "hover:bg-gray-700"
              } rounded-md px-3 py-2 transition-all`}
              to="stores"
            >
              Stores
            </Link>
          </div>
          <Link
            className="transition-all self-center"
            to="shopping-cart"
          >
            <button
              type="button"
              className="p-1.5 focus:outline-hidden focus:ring-1 focus:ring-white focus:ring-offset-1 rounded-full"
            >
              <img className="size-6 brightness-75 hover:brightness-200" src="./shopping-cart.svg" />
            </button>
          </Link>
        </nav>
      </header>
      <main>
        <Outlet context={{ items, carts, setCarts, setActive }} />
      </main>
      <footer>
        <div className="bg-gray-900 text-gray-400 text-base *:cursor-pointer p-4 min-h-50 grid place-items-center">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-2">
            <p className="hover:text-gray-200">About</p>
            <p className="hover:text-gray-200">Blog</p>
            <p className="hover:text-gray-200">Jobs</p>
            <p className="hover:text-gray-200">Stores</p>
            <p className="hover:text-gray-200">Accessibility</p>
            <p className="hover:text-gray-200">Partners</p>
          </div>
          <div className="flex gap-x-8 justify-center">
            <img
              className="max-w-full hover:brightness-200 block w-5"
              src="./facebook-brands.svg"
              alt=""
            />
            <img
              className="max-w-full hover:brightness-200 block w-5"
              src="./instagram-brands.svg"
              alt=""
            />
            <img
              className="max-w-full hover:brightness-200 block w-5"
              src="./x-twitter-brands.svg"
              alt=""
            />
            <img
              className="max-w-full hover:brightness-200 block w-5"
              src="./github-brands.svg"
              alt=""
            />
            <img
              className="max-w-full hover:brightness-200 block w-5"
              src="./youtube-brands.svg"
              alt=""
            />
          </div>
          <p className="text-center">
            © 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
