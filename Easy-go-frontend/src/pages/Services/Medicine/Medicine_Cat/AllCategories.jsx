import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const categories = [
  {
    cat: "OTC Medicine",
    to: "otc-medicine",
    icon: "fa-solid fa-pills",
  },
  {
    cat: "Women's Choice",
    to: "women-choice",
    icon: "fa-solid fa-venus",
  },
  {
    cat: "Sexual Wellness",
    to: "sexual-wellness",
    icon: "fa-solid fa-person-pregnant",
  },
  {
    cat: "Diabetic Care",
    to: "diabetic-care",
    icon: "fa-solid fa-hospital-user",
  },
  {
    cat: "Baby Care",
    to: "baby-care",
    icon: "fa-solid fa-baby",
  },
  {
    cat: "Dental Care",
    to: "dental-care",
    icon: "fa-solid fa-tooth",
  },
  {
    cat: "Personal Care",
    to: "personal-care",
    icon: "fa-solid fa-person-circle-check",
  },
  {
    cat: "Prescription",
    to: "prescription",
    icon: "fa-solid fa-prescription",
  },
];

const AllCategories = () => {
  const { mediators } = useSelector((state) => state.mediator);
  const location = useLocation();

  const cat = mediators?.data;
  const path = location.pathname.split("/")[1];
  return (
    <div className="flex flex-wrap gap-4 ml-[20px] mt-[100px] mb-6">
      {path === "medicine" ? (
        <>
          {categories.map((category, index) => (
            <Link to={`/medicine/cat/${category.to}`} key={index}>
              <div
                key={index}
                className="flex flex-col justify-center items-center border border-gray-300 rounded-xl shadow-sm h-44 w-44"
              >
                <i className={`${category.icon} text-3xl`}></i>
                <h4 className="text-custom text-xl font-semibold">
                  {category.cat}
                </h4>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <>
          {cat.map((item, index) => (
            <Link
              key={index}
              to={`/mediator/${item?.category.name
                .toLowerCase()
                .split(" ")
                .join("-")}`}
            >
              <div
                key={index}
                className="flex flex-col justify-center items-center border border-gray-300 rounded-xl shadow-sm h-44 w-44"
              >
                <img
                  className="h-6 w-6"
                  src={`${import.meta.env.VITE_APP_BASE_URL}/categories/${
                    item?.category?.image
                  }`}
                  alt=""
                ></img>
                <h4 className="text-custom text-xl font-semibold">
                  {item?.category.name}
                </h4>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default AllCategories;
