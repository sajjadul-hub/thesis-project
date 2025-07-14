/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { email, isLoading } = useSelector((state) => state?.auth);
  const { products } = useSelector((state) => state?.cart);
  console.log(products);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-6">
        {[1].map((item) => (
          <Loader key={item} />
        ))}
      </div>
    );
  }

  if (email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
