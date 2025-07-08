import { Link, useOutletContext } from "react-router-dom";

const HomePage = () => {
  const { setActive } = useOutletContext();

  return (
    <div className="grid min-h-lvh place-items-center">
      <div className="text-center">
      <h1 className="text-5xl font-semibold text-gray-900">
        New arrivals are here
      </h1>
      <p className="text-lg font-medium wrap-break-word pb-8 text-gray-500 pt-6 max-w-[70%] mx-auto">
        The new arrivals have, well, newly arrived. Check out the latest options
        from our summer small-batch release while they're still in stock.
      </p>
      <Link
        onClick={() => setActive("stores")}
        className="text-lg p-2 px-4 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:bg-gray-950 transition-all"
        to="stores"
      >
        Shop New Arrivals
      </Link>
    </div>
    </div>
  );
};

export default HomePage;
