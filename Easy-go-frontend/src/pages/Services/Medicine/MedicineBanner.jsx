import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomDot } from "./CustomDot";
import { useEffect, useState } from "react";
import { publicRequest } from "../../../requestMethod";
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
  },
};
export default function MedicineBanner() {
  const [data, setData] = useState([]);

  useEffect(() => {
    publicRequest
      .get(`/banner?cat=medicine`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="mx-[20px] rounded-md">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay={true}
        autoPlaySpeed={3000}
        centerMode={false}
        className="rounded-md z-0"
        containerClass="container"
        customDot={<CustomDot />}
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <img
                key={item._id}
                src={`${import.meta.env.VITE_APP_BASE_URL}/banners/${
                  item.banner
                }`}
                style={{
                  display: "block",
                  height: "300px",
                  margin: "auto",
                  width: "100%",
                }}
              />
            );
          })
        ) : (
          <img
            src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            style={{
              display: "block",
              height: "300px",
              margin: "auto",
              width: "100%",
            }}
          />
        )}
      </Carousel>
    </div>
  );
}
