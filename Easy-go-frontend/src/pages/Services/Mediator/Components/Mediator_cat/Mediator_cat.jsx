import "./Mediator.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
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

const MediatorCategory = () => {
  const { mediatorCategory } = useSelector((state) => state.mediator);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold ml-3">Mediator Categories</h1>
        <Link to="/mediator/categories">
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
        {mediatorCategory?.map((item, index) => (
          <Link
            key={index}
            to={`/mediator/${item?.name.toLowerCase().split(" ").join("-")}`}
          >
            <div
              key={index}
              className="flex flex-col justify-center items-center border border-gray-300 rounded-xl shadow-sm h-44 w-44"
            >
              <img
                className="h-6 w-6"
                src={`${import.meta.env.VITE_APP_BASE_URL}/categories/${
                  item?.image
                }`}
                alt=""
              ></img>
              <h4 className="text-custom text-xl font-semibold">
                {item?.name}
              </h4>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default MediatorCategory;
