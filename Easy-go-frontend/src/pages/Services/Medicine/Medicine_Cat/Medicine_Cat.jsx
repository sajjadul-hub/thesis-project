import Carousel from "react-multi-carousel";
import "./Medicine_Cat.css";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 769, min: 0 },
    items: 2,
  },
};
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
const Medicine_Cat = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold ml-3">Medicine Categories</h1>
        <Link to="/medicine/categories">
          <button className="text-primary underline text-xl font-semibold">
            View All
          </button>
        </Link>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay={false}
        centerMode={false}
        className=" z-0"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass="item"
        keyBoardControl={true}
        minimumTouchDrag={50}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass="slider-w"
        slidesToSlide={1}
        swipeable={false}
      >
        {categories.map((category, index) => (
          <Link key={index} to={`/medicine/cat/${category.to}`}>
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
      </Carousel>
    </div>
  );
};

export default Medicine_Cat;
