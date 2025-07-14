/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import { Pagination, Autoplay } from "swiper/modules";
import { useLocation } from "react-router-dom";
import img from "../../../assets/banner/bannerImg.png";

const Slider = ({ data }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className="mySwiper "
      >
        {data ? (
          data.map((item) => {
            return (
              <SwiperSlide key={item._id}>
                <div
                  className={`hero lg:mt-0 mt-2 lg:bg-transparent bg-[#E3F9E7]  lg:mx-auto pt-4 ${
                    path === "mediator" ? "lg:w-[80vw]" : ""
                  }`}
                >
                  <div className="hero-content lg:flex-row-reverse flex-col-reverse">
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}/banners/${
                        item?.banner
                      }`}
                      style={{ width: path === "mediator" ? "400px" : "600px" }}
                    />
                    <div className="text-center lg:text-left">
                      <h1 className="lg:text-5xl text-2xl font-bold  lg:border-0 w-44 lg:w-auto lg:mx-0 mx-auto lg:mt-0 mt-4 lg:pb-0 pb-2 border-4  border-[#3CBD96]">
                        {item?.title}
                      </h1>
                      <p className="py-6  text-lg text-gray-400 lg:text-2xl font-simebold">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>
            <div
              className={`hero lg:mt-0 mt-2 lg:bg-transparent bg-[#E3F9E7]  lg:mx-auto pt-4 ${
                path === "mediator" ? "lg:w-[80vw]" : ""
              }`}
            >
              <div className="hero-content  lg:flex-row-reverse flex-col-reverse">
                <img
                  src={img}
                  style={{ width: path === "mediator" ? "400px" : "600px" }}
                />
                <div className="text-center lg:text-left">
                  <h1 className="lg:text-5xl text-3xl font-bold ">
                    Largest and reliable daily{" "}
                    <br className="hidden lg:block" />
                    service in your city
                  </h1>
                  <h1 className="lg:text-5xl text-2xl font-bold  lg:border-0 w-44 lg:w-auto lg:mx-0 mx-auto lg:mt-0 mt-4 lg:pb-0 pb-2 border-4  border-[#3CBD96]">
                    in your city
                  </h1>
                  <p className="py-6  text-lg text-gray-400 lg:text-2xl font-simebold">
                    Coordinated connected credible
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};
export default Slider;
