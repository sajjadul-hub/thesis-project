import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Context/AuthProvider";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMediators } from "../../../../../features/mediator/serviceApi";
import Loader from "../../../Medicine/MedicineHome/Loader";

// eslint-disable-next-line react/prop-types
const AllMediator = ({ category }) => {
  const { mediators, isLoading } = useSelector((state) => state.mediator);
  const dispatch = useDispatch();
  const { handleAddToCart } = useContext(AuthContext);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mediators?.meta?.total / itemsPerPage);

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
      categoryFlag: category,
      page: currentPage,
      limit: itemsPerPage,
    };
    if (query) {
      getMediators(dispatch, query);
    }
  }, [dispatch, currentPage, category]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center flex-wrap gap-1 ">
          {mediators &&
            mediators?.data?.map((item, id) => (
              <div
                key={id}
                className="lg:w-[300px]   p-3 shadow-xl rounded-lg "
              >
                <Link to={`/mediator/${item._id}`} className="text-left">
                  <div key={id}>
                    <div className="text-neutral bg-red-600 w-[74px] p-[2px] ml-[-9px] text-center rounded-md shadow-md my-3">
                      {item?.discount}off
                    </div>
                    <div className="w-full h-[200px] mx-auto">
                      <img
                        className="w-full h-full object-cover"
                        src={`${import.meta.env.VITE_APP_BASE_URL}/products/${
                          item.image
                        }`}
                        alt={item.image}
                      />
                    </div>
                    <div className="mt-4 h-20">
                      <span className="flex justify-start gap-x-6">
                        <h4 className="text-xl font-bold">{item?.name}</h4>
                      </span>

                      <p className="text-primary">
                        {item.description.slice(0, 100)}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-between mt-5 p-2 items-center ">
                  <div className="flex flex-col">
                    <span className="font-semibold text-xl">
                      <i className="fa-solid fa-bangladeshi-taka-sign" />{" "}
                      {item?.discountPrice}
                    </span>
                    <del className="text-custom">
                      <i className="fa-solid fa-bangladeshi-taka-sign" />{" "}
                      {item?.basePrice}
                    </del>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item?._id, 1, "", navigate)}
                    className="outline-none rounded-md bg-primary border-none text-neutral w-24 h-9"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="join my-7 w-full border border-gray-400 flex justify-between items-center">
        <div className="px-3">
          <button className="mx-3" onClick={() => goToPage(currentPage - 1)}>
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
          <button className="mx-3" onClick={() => goToPage(currentPage + 1)}>
            <i className="fa-solid fa-forward-step"></i>
          </button>
        </div>
        <div className="pr-4 hidden md:block">
          <p>
            Showing {itemsPerPage * (currentPage - 1) + 1} to{" "}
            {Math.min(itemsPerPage * currentPage, mediators?.data?.length)} of{" "}
            {mediators?.meta?.total}
          </p>
        </div>
      </div>
    </>
  );
};

export default AllMediator;
