import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="grid min-h-lvh place-items-center">
      <div className="text-center">
        <p className="text-indigo-600 mt-4 font-semibold text-base">404</p>
        <h1 className="text-5xl text-balance text-gray-900 font-semibold">Page not found</h1>
        <p className="text-gray-500 text-lg font-medium my-3">Sorry, we couldn't find the page you're looking for.</p>
        <Link className="bg-indigo-600 hover:bg-indigo-500 rounded-md font-semibold text-white p-2 px-4" to="/">Go back home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
