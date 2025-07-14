/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/mainroutes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AuthProvider from "./Context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer autoClose={2000} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
