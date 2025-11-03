import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { productsData } from "./api/Api";
import Product from "./components/Product";
import ItemCards from "./components/ItemCards";
import CheckOutSuccess from "./pages/CheckOutSuccess";
import CheckOutCancel from "./pages/CheckOutCancel";


const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: productsData,
      },
      {
        path: "/category/:id",
        element: <ItemCards />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/checkout-success",
        element: <CheckOutSuccess />,
      },
      {
        path: "/checkout-cancel",
        element: <CheckOutCancel />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
