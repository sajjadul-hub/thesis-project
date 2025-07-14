/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  clearCart,
  removeFromCart,
} from "../features/MedicineCart/cartSlice";
import Swal from "sweetalert2";

import {
  mediatorToCart,
  mediatorclearCart,
  mediatoremoveCart,
} from "../features/mediatorCart/mediatorCart";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { medicines } = useSelector((state) => state.medicine);
  const { email } = useSelector((state) => state.auth);
  const { mediators } = useSelector((state) => state.mediator);
  const { mediatorCart } = useSelector((state) => state.mediatorCart);
  const { products, total } = useSelector((state) => state?.cart);
  const dispatch = useDispatch();

  const handleSingleCart = (medicine, quantity, type, navigate) => {
    if (email) {
      if (type == "medicine") {
        const data = {
          ...medicine,
          quantity: quantity,
          total: medicine?.discountPrice,
        };

        try {
          dispatch(addToCart(data));
          toast.success("Added to Cart successfully", {
            icon: <i className=" text-primary fa-solid fa-box "></i>,
          });
        } catch (error) {
          console.log(error);

          toast.warn("Something went wrong! May be occurred ,${error}");
        }
      } else {
        const data = {
          ...medicine,
          quantity: quantity,
          total: medicine?.discountPrice,
        };

        try {
          dispatch(mediatorToCart(data));
          toast("Added to Cart successfully", {
            icon: <i className="text-primary fa-brands fa-telegram "></i>,
            type: "success", // Add Tailwind CSS classes for styling
          });
        } catch (error) {
          console.log(error);

          toast.warn("Something went wrong! May be occurred ,${error}");
        }
      }
    } else {
      if (type == "medicine") {
        navigate("/login", {
          state: { cartItems: medicine, autoAddToCart: true },
        });
      } else {
        navigate("/login", {
          state: { cartItems: medicine, autoAddToCart: false },
        });
      }
    }
  };

  const handleAddToCart = (id, quantity, type, navigate) => {
    if (email) {
      if (type == "medicine") {
        const medicine = medicines.data.find((item) => item._id === id);
        const data = {
          ...medicine,
          quantity: quantity,
        };

        try {
          dispatch(addToCart(data));
          toast.success("Added to Cart successfully", {
            icon: <i className=" text-primary fa-solid fa-box "></i>,
          });
        } catch (error) {
          console.log(error);

          toast.warn("Something went wrong! May be occurred ,${error}");
        }
      } else {
        const mediator = mediators.data.find((item) => item._id === id);

        const data = {
          ...mediator,
          quantity: quantity,
        };

        try {
          dispatch(mediatorToCart(data));
          toast.success("Added to Cart successfully", {
            icon: <i className="text-primary fa-brands fa-telegram "></i>,
            // Add Tailwind CSS classes for styling
          });
        } catch (error) {
          console.log(error);

          toast.warn("Something went wrong! May be occurred ,${error}");
        }
      }
    } else {
      if (type == "medicine") {
        const medicine = medicines.data.find((item) => item._id === id);
        navigate("/login", {
          state: { cartItems: medicine, autoAddToCart: true },
        });
      } else {
        const mediator = mediators.data.find((item) => item._id === id);
        navigate("/login", {
          state: { cartItems: mediator, autoAddToCart: false },
        });
      }
    }
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3CBD96 ",
      cancelButtonColor: "#3CBD96 ",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(mediatorclearCart());
        dispatch(clearCart());
        Swal.fire({
          title: "Deleted!",
          text: "Your Products has been deleted.",
          icon: "success",
          confirmButtonColor: "#3CBD96 ",
        });
      }
    });
  };
  const handleRemoveFromCart = (productId, type) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3CBD96 ",
      cancelButtonColor: "#3CBD96 ",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (type == "medicine") {
          const productToRemove = products.find(
            (product) => product._id === productId
          );
          if (productToRemove) {
            dispatch(removeFromCart(productToRemove));
          }
        } else {
          const productToRemove = mediatorCart.find(
            (product) => product._id === productId
          );
          if (productToRemove) {
            dispatch(mediatoremoveCart(productToRemove));
          }
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success",
          confirmButtonColor: "#3CBD96 ",
        });
      }
    });
  };
  const authInfo = {
    handleAddToCart,
    handleSingleCart,
    handleClearCart,
    handleRemoveFromCart,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
