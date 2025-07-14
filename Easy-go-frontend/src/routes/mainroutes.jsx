/* eslint-disable no-dupe-keys */
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../LayOut/Main/Main";
import MedicineLayout from "../LayOut/MedicineLayout/MedicineLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import BikeRent from "../pages/Services/BikeRent/BikeRent";
import ProductDelivery from "../pages/Services/ProductDelivery/ProductDelivery";
import Contact from "../pages/Contact/Contact";
import Mediator from "../pages/Services/Mediator/Mediator";
import Blog from "../pages/Blog/Blog";
import BlogDetails from "../pages/Blog/BlogDetails";
import OrderHome from "../pages/OrderPage/OrderHome/OrderHome";
import MedicineHome from "../pages/Services/Medicine/MedicineHome/MedicineHome";
import AllCategories from "../pages/Services/Medicine/Medicine_Cat/AllCategories";
import PaymentSuccess from "../components/booking/success";
import Profile from "../pages/Profile/Profile";
import SingleMedicine from "../pages/Services/Medicine/components/SingleMedicine/SingleMedicine";
import MediatorLayout from "../LayOut/Mediator/MediatorLayout";
import Details from "../pages/Services/Mediator/Components/Details/Details";
import StepperHome from "../pages/CheckOut/StepperHome";
import PrivateRoute from "./Private/PrivateRoute";
import AllMediator from "../pages/Services/Mediator/Components/AllMediator/AllMediator";
import AllMedicine from "../pages/Services/Medicine/components/AllMedicine/AllMedicine";
import MediatorCategory from "../pages/Services/Mediator/Components/Mediator_cat/Mediator_cat";
import SuccessView from "../components/Successpage/SuccessView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/bike-rent",
        element: <BikeRent />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: "/product-delivery",
        element: <ProductDelivery />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/order",
        element: <OrderHome />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <StepperHome />,
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/success/:transaction_Id",
        element: (
          <PrivateRoute>
            <SuccessView />,
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/medicine",
    element: <MedicineLayout />,
    children: [
      {
        path: "/medicine",
        element: <MedicineHome />,
      },
      {
        path: "/medicine/cat/otc-medicine",
        element: <AllMedicine cat={"otc"} />,
      },
      {
        path: "/medicine/cat/women-choice",
        element: <AllMedicine cat={"women"} />,
      },
      {
        path: "/medicine/cat/baby-care",
        element: <AllMedicine cat={"baby"} />,
      },
      {
        path: "/medicine/cat/dental-care",
        element: <AllMedicine cat={"dental"} />,
      },
      {
        path: "/medicine/cat/diabetic-care",
        element: <AllMedicine cat={"diabetic"} />,
      },
      {
        path: "/medicine/cat/sexual-wellness",
        element: <AllMedicine cat={"sexual"} />,
      },
      {
        path: "/medicine/cat/personal-care",
        element: <AllMedicine cat={"personal"} />,
      },
      {
        path: "/medicine/cat/prescription",
        element: <AllMedicine cat={"prescription"} />,
      },
      {
        path: "/medicine/categories",
        element: <AllCategories />,
      },
      {
        path: "/medicine/cat/:id",
        element: <SingleMedicine />,
      },
    ],
  },
  {
    path: "/mediator",
    element: <MediatorLayout />,
    children: [
      {
        path: "/mediator",
        element: <Mediator />,
      },
      {
        path: "/mediator/local-food",
        element: <AllMediator category={"Local Food"} />,
      },
      {
        path: "/mediator/traditional-clothes",
        element: <AllMediator category={"Traditional Clothes"} />,
      },
      {
        path: "/mediator/handicraft",
        element: <AllMediator category={"Handicraft"} />,
      },
      {
        path: "/mediator/vegetable",
        element: <AllMediator category={"Vegetable"} />,
      },
      {
        path: "/mediator/categories",
        element: <MediatorCategory />,
      },
      {
        path: "/mediator/:id",
        element: <Details />,
      },
    ],
  },
]);
export default router;
