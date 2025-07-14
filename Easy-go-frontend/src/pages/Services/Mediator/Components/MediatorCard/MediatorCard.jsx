/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Context/AuthProvider";
import "../../../Medicine/components/MedicineCard/MedicineCard.css";

const MediatorCard = ({ mediator, category }) => {
  const cat = category.toLowerCase().split(" ").join("-");
  const navigate = useNavigate();
  const { handleAddToCart } = useContext(AuthContext);
  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold ml-3">{category}</h1>
        <Link to={`/mediator/${cat}`}>
          <button className="text-primary">View All</button>
        </Link>
      </div>
      <Carousel responsive={responsive}>
        {mediator &&
          mediator.map((item, id) => (
            <div
              key={id}
              className="p-3 shadow-md rounded-lg h-[400px] mb-2 border-t-2 product-card"
            >
              <Link to={`/mediator/${item._id}`} className="text-left">
                <div key={id}>
                  <div className="text-neutral bg-red-600 w-[74px] p-[2px] ml-[-9px] text-center rounded-md shadow-md my-3">
                    {item?.discount}off
                  </div>
                  <div className="w-full h-40 mx-auto">
                    <img
                      className="w-full h-[150px] object-cover"
                      src={`${import.meta.env.VITE_APP_BASE_URL}/products/${
                        item.image
                      }`}
                      alt={item.image}
                    />
                  </div>
                  <div className="mt-2 h-16">
                    <span className="flex justify-start gap-x-6">
                      <h4 className="text-xl font-bold">{item?.name}</h4>
                    </span>
                    <p className="text-primary">
                      {item?.description.length > 100
                        ? item?.description?.slice(0, 90) + "..."
                        : item?.description}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex justify-between mt-6 ps-0 p-2 items-center">
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
      </Carousel>
    </div>
  );
};

export default MediatorCard;
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 769, min: 0 },
    items: 1,
  },
};
