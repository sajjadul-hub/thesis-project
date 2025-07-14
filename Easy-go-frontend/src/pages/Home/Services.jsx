import startImg from "../../assets/ServicesImg/starImg.png";
import BikeRent from "../../assets/ServicesImg/1BikeRent.png";
import EmergencyMedicine from "../../assets/ServicesImg/2EmergencyMedicine.png";
import Parceldelivery from "../../assets/ServicesImg/3Parceldelivery.png";
import LocalMediator from "../../assets/ServicesImg/4LocalMediator.png";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div className="bg-[#E3F9E7] py-10">
      <div className=" flex justify-between">
        <div></div>
        <img
          className="w-[45px] h-[45] me-20 lg:block hidden"
          src={startImg}
          alt=""
        />
      </div>

      <div className="lg:flex justify-center items-center gap-24">
        <h1 className="lg:py-0 py-5 text-center lg:text-left text-3xl uppercase font-bold">
          OUR SERVices
        </h1>
        <p className="text-xl font-semibold text-[15px] text-[#777E90] text-center lg:text-left">
          Unlocking Possibilities, Delivering Excellence <br /> Discover a World
          of Tailored Services Crafted Just
          <br /> For You.
        </p>
      </div>

      <div className="px-20 lg:mx-0 flex justify-center items-center lg:gap-2 gap-7 lg:justify-around flex-col lg:flex-row mt-12">
        <div className="h-[300px] px-7 border-[1px] rounded-xl w-[270px]  border-[#53BA02] bg-white flex flex-col justify-center py-8 shadow-xl">
          <div className="bg-[#3CBD96] rounded-[18px] flex justify-center items-center px-3 mx-auto py-2">
            <img className="w-[50px] h-[50px]" src={EmergencyMedicine} alt="" />
          </div>
          <h1 className="text-center text-xl font-semibold my-2">
            Emergency Medicine{" "}
          </h1>
          <p className="text-center text-[#777E90]">
            Ride the Moment: Rent Your Adventure!
          </p>
          <Link
            to="/medicine"
            className=" uppercase bg-[#3CBD96] text-white font-semibold hover:text-black w-auto rounded-lg py-2 px-5 mt-4 mx-auto"
          >
            visit now
          </Link>
        </div>

        <div className="h-[300px] px-7 border-[1px] rounded-xl w-[270px]  border-[#53BA02] bg-white flex flex-col justify-center py-8 shadow-xl">
          <div className="bg-[#3CBD96] rounded-[18px] flex justify-center items-center px-3 mx-auto py-2">
            <img className="w-[50px] h-[50px]" src={Parceldelivery} alt="" />
          </div>
          <h1 className="text-center text-xl font-semibold my-2">
            Parcel delivery{" "}
          </h1>
          <p className="text-center text-[#777E90]">
            Swift Response, Saving Lives.
          </p>
          <Link
            to="/product-delivery"
            className=" uppercase bg-[#3CBD96] hover:text-black text-white font-semibold w-auto rounded-lg py-2 px-5 mt-10 mx-auto"
          >
            visit now
          </Link>
        </div>

        <div className="h-[300px] px-7 border-[1px] rounded-xl w-[270px]  border-[#53BA02] bg-white flex flex-col justify-center py-8 shadow-xl">
          <div className="bg-[#3CBD96] rounded-[18px] flex justify-center items-center px-3 mx-auto py-2">
            <img className="w-[50px] h-[50px]" src={BikeRent} alt="" />
          </div>
          <h1 className="text-center text-xl font-semibold my-2">Bike Rent</h1>
          <p className="text-center text-[#777E90]">
            Delivering Care, Beyond Compare.
          </p>
          <Link
            to="/bike-rent"
            className=" uppercase bg-[#3CBD96] hover:text-black text-white font-semibold w-auto rounded-lg py-2 px-5 mt-4 mx-auto"
          >
            visit now
          </Link>
        </div>

        <div className="h-[300px] px-7 border-[1px] rounded-xl w-[270px]  border-[#53BA02] bg-white flex flex-col justify-center py-8 shadow-xl">
          <div className="bg-[#3CBD96] rounded-[18px] flex justify-center items-center px-3 mx-auto py-2">
            <img className="w-[50px] h-[50px]" src={LocalMediator} alt="" />
          </div>
          <h1 className="text-center text-xl font-semibold my-2">
            Local Mediator
          </h1>
          <p className="text-center text-[#777E90]">
            Connecting You to Homegrown Excellence.
          </p>
          <Link
            to="/mediator"
            className=" uppercase bg-[#3CBD96] hover:text-black text-white font-semibold w-auto rounded-lg py-2 px-5 mt-4 mx-auto"
          >
            visit now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
