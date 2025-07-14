/* eslint-disable react/no-unescaped-entities */
import gps from "../../assets/PosterImg/GPS.png";
const GPS = () => {
  return (
    <div className="lg:mb-1 mb-10">
      <div
        className="hidden lg:block mt-20 lg:h-[500px]"
        style={{
          backgroundImage: `url(${gps})`,
          backgroundRepeat: "no-repeat",
          borderRadius: "0px 20px 20px 0px",
          backgroundPosition: "right",
          backgroundSize: "50%",
          marginLeft: "-40px",
        }}
      >
        <div className="pt-20 ps-5 mx-28">
          <div className=" lg:px-8 py-5 lg:py-5 flex flex-col justify-center lg:block">
            <h1 className="lg:text-3xl text-xl font-bold lg:w-[70%] text-center lg:text-left">
              Follow your shipment via GPS
            </h1>
            <p className="lg:text-lg  text-sm text-[#777E90] lg:py-3 lg:w-[70%] text-justify lg:text-left">
              Stay in the Know: Seamlessly Track Your Shipment's Journey with
              Real-Time GPS <br /> Monitoring!
            </p>
            <button className="hover:text-black uppercase  font-semibold w-36 rounded-lg py-2 mt-4 mx-auto text-white bg-[#3CBD96] border-[1px] border-[#ABE1D1]">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden pt-0 ps-5 lg:mx-28 mx-10">
        <div className=" lg:px-8 py-5 lg:py-5 flex flex-col justify-center lg:block">
          <h1 className="lg:text-3xl text-2xl font-bold lg:w-[70%] text-center lg:text-left">
            Follow your shipment via GPS
          </h1>
          <p className=" text-[#777E90] lg:py-3 lg:w-[70%]  text-left">
            Stay in the Know: <br /> Seamlessly Track Your <br /> Shipment's
            Journey with
            <br /> Real-Time GPS <br /> Monitoring!
          </p>
          <button className="text-sm py-1  uppercase  font-semibold w-36 rounded-lg lg:py-2 mt-4  text-white bg-[#3CBD96] border-[1px] border-[#ABE1D1]">
            Learn More
          </button>
        </div>
      </div>
      <div className="mt-10 lg:mt-[-150px] text-center">
        <h1 className="lg:text-4xl text-2xl font-bold">
          Discover What Our Valued Customers Are Saying
        </h1>
        <p className="lg:text-lg text-sm text-[#777E90] mt-1 lg:mt-[10px]">
          Read Honest and Insightful User Reviews!
        </p>
      </div>
    </div>
  );
};

export default GPS;
