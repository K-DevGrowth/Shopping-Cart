import App from "./App";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import Stores from "./components/Stores";
import ShoppingCart from "./components/ShoppingCart";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "stores", element: <Stores /> },
      { path: "/", element: <HomePage /> },
      { path: "shopping-cart", element: <ShoppingCart /> },
    ],
    errorElement: <ErrorPage />
  },
];
