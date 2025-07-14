/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import "./AllMedicine.css";
import { getMedicines } from "../../../../../features/medicine/serviceApi";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../Context/AuthProvider";

const AllMedicine = ({ cat }) => {
  const { medicines, isLoading } = useSelector((state) => state.medicine);
  const { handleAddToCart } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(medicines?.meta?.total / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    const query = {
      cat: cat,
      page: currentPage,
      limit: itemsPerPage,
    };
    if (query) {
      getMedicines(dispatch, query);
    }
  }, [dispatch, currentPage, cat]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex justify-center flex-wrap gap-4">
            {medicines?.data?.map((item, index) => (
              <div
                key={index}
                className="p-3 shadow-md hover:shadow-xl cursor-pointer w-full sm:w-auto"
              >
                <Link to={`/medicine/cat/${item._id}`} className="text-left">
                  <div className="text-neutral bg-red-600 w-[74px] p-[2px] ml-[-9px] text-center rounded-md shadow-md my-3">
                    {item.discount} off
                  </div>
                  <div className="w-40 h-40 mx-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={`${import.meta.env.VITE_APP_BASE_URL}/medicines/${
                        item.img
                      }`}
                      alt={item.img}
                    />
                  </div>
                  <div className="mt-4">
                    <span className="flex justify-start gap-x-6">
                      <h4 className="text-xl font-bold">{item.name}</h4>
                      <p className="text-custom">
                        {item.power} {`${item.type == "syrup" ? "ml" : "mg"}`}
                      </p>
                    </span>
                    <p>{item.group}</p>
                    <p className="text-primary">{item.pharmacyName}</p>
                  </div>
                </Link>
                <div className="flex justify-between mt-5 p-2 items-center">
                  <div className="flex flex-col">
                    <span className="font-semibold text-xl">
                      <i className="fa-solid fa-bangladeshi-taka-sign" />{" "}
                      {item.discountPrice}
                    </span>
                    <del className="text-custom">
                      <i className="fa-solid fa-bangladeshi-taka-sign" />{" "}
                      {item.basePrice}
                    </del>
                  </div>
                  <button
                    onClick={() =>
                      handleAddToCart(item?._id, 1, "medicine", navigate)
                    }
                    className="outline-none rounded-md bg-primary border-none text-neutral w-24 h-9"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="join my-7 w-full border border-gray-400 flex justify-between items-center">
            <div className="px-3">
              <button
                className="mx-3"
                onClick={() => goToPage(currentPage - 1)}
              >
                <i className="fa-solid fa-forward-step rotate-180"></i>
              </button>
              {Array.from({ length: totalPages }).map((_, page) => (
                <button
                  key={page}
                  className={`join-item btn ${
                    currentPage === page + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => goToPage(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
              <button
                className="mx-3"
                onClick={() => goToPage(currentPage + 1)}
              >
                <i className="fa-solid fa-forward-step"></i>
              </button>
            </div>
            <div className="pr-4 hidden md:block">
              <p>
                Showing {itemsPerPage * (currentPage - 1) + 1} to{" "}
                {Math.min(itemsPerPage * currentPage, medicines?.data?.length)}{" "}
                of {medicines?.meta?.total}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllMedicine;
