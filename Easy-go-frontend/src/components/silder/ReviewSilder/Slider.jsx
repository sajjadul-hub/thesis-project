import { useState, useEffect } from "react";
import arrow from "../../../assets/reviewerImg/arrow.png";
import commit from "../../../assets/reviewerImg/commit.png";
import { getReview } from "../../../features/review/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import CustomRating from "../../rating/rating";
import Skeleton from "react-loading-skeleton";

function Slider() {
  const { reviews, isLoading } = useSelector((state) => state.review);
  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    const autoplayInterval = 4000;

    const autoplay = setInterval(() => {
      const nextSlide = (currentSlide + 1) % 3;
      setCurrentSlide(nextSlide);
    }, autoplayInterval);

    return () => {
      clearInterval(autoplay);
    };
  }, [currentSlide]);

  const dispatch = useDispatch();

  useEffect(() => {
    getReview(dispatch);
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="shadow-md">
          <Skeleton count={1} height={"300px"} />
        </div>
      ) : reviews?.length === 0 ? (
        <div
          className="w-[100%] h-[300px] flex justify-center items-center"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        >
          No Review Found
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyContant: "center",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <div>
              {reviews.map((data, i) => (
                <div
                  onClick={() => showSlide(i)}
                  key={data._id}
                  className="ps-1 lg:w-[370px] w-[150px] flex gap-3 lg:gap-0 lg:justify-between lg:px-10 py-2 items-center mb-3 rounded-lg cursor-pointer"
                  style={{
                    background:
                      currentSlide === i
                        ? "linear-gradient(90deg, rgba(2,0,36,1) 0%, #ffffff 0%, #E3F9E7 90%)"
                        : "linear-gradient(90deg, rgba(2,0,36,1) 0%, #E3F9E7 0%, rgb(255, 255, 255) 90%)",
                  }}
                >
                  <img
                    className="h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]"
                    src={data?.user?.photoURL}
                    alt=""
                  />
                  <h1>{data?.user.name}</h1>
                  <img
                    className="h-[12px] w-[6px] lg:h-[24px] lg:w-[12px]"
                    src={arrow}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className=" lg:h-[283px] h-[223px] bg-[#E3F9E7] flex flex-col justify-center  items-center pt-10 rounded-lg relativez lg:ms-[-8px] ms-[-14px] mt-[-10px] lg:w-[780px] w-[200px]">
              <img
                className="h-[24px] w-[24px] lg:h-[50px] lg:w-[50px]"
                src={commit}
                alt=""
              />
              <p className="block  lg:px-24 px-4 text-center lg:text-base text-[12px]">
                {reviews[currentSlide]?.message}
              </p>
              <button className="lg:text-xl font-bold mt-[30px] mb-[20px] lg:block hidden">
                {reviews[currentSlide]?.user?.name}
              </button>
              <CustomRating
                size={40}
                value={Number(reviews[currentSlide]?.star)}
                color="#00ff00"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Slider;
