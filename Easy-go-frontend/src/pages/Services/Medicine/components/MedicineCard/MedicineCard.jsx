/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MedicineCard.css";
// import { addToCart } from "../../../../../features/MedicineCart/cartSlice";
// import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../../../../../Context/AuthProvider";

const MedicineCard = ({ medicines, category }) => {
  const cat = category.toLowerCase().split(" ").join("-");
  const navigate = useNavigate();
  const { handleAddToCart } = useContext(AuthContext);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold ml-3">{category}</h1>
        <Link to={`/medicine/cat/${cat}`}>
          <button className="text-primary">View All</button>
        </Link>
      </div>
      <Carousel responsive={responsive}>
        {medicines &&
          medicines?.length > 0 &&
          medicines.map((item, id) => (
            <div
              key={id}
              className="p-3 rounded-lg  mb-2 product-card flex flex-col justify-between border-b-2 border-t-2  "
            >
              <Link to={`/medicine/cat/${item._id}`} className="text-left">
                <div>
                  <div className="text-neutral bg-red-600 w-[74px] p-[2px] text-center rounded-md shadow-md my-3">
                    {item.discount} off
                  </div>
                  <div className="w-40 h-40 mx-auto">
                    <img
                      className="w-full h-[150px] object-cover"
                      src={`${import.meta.env.VITE_APP_BASE_URL}/medicines/${
                        item.img
                      }`}
                      alt={item.img}
                    />
                  </div>
                  <div className="mt-2">
                    <span className="flex justify-start gap-x-6">
                      <h4 className="text-lg font-bold">{item.name}</h4>
                      <p className="text-custom">{item.power}</p>
                    </span>
                    <p>{item.group}</p>
                    <p className="text-primary">{item.pharmacyNam}</p>
                  </div>
                </div>
              </Link>
              <div className="flex justify-between mt-8  items-center">
                <div className="flex flex-col items-center">
                  <del className="text-custom">
                    <i className="fa-solid fa-bangladeshi-taka-sign" />{" "}
                    {item.basePrice}
                  </del>
                  <span className="font-semibold text-xl">
                    <i className="fa-solid fa-bangladeshi-taka-sign" />{" "}
                    {item.discountPrice}
                  </span>
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
      </Carousel>
    </div>
  );
};

export default MedicineCard;

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
