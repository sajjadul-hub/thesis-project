import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/users/user/User";
import Product from "./pages/product/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cards from "./components/cards/Cards";
import Blogs from "./pages/blogs/Blogs";
import Medicine from "./pages/medicines/Medicine";
import Orders from "./pages/orders/Orders";
import Prescription from "./pages/prescription/prescription";
import Banner from "./pages/Banner/Banner";
import Category from "./pages/category/Category";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
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
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        // {
        //   path: "/users/:id",
        //   element: <User />,
        // },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/prescription",
          element: <Prescription />,
        },
        {
          path: "/medicines",
          element: <Medicine />,
        },
        {
          path: "/banner",
          element: <Banner />,
        },
        {
          path: "/charts",
          element: <Cards />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/category",
          element: <Category />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
