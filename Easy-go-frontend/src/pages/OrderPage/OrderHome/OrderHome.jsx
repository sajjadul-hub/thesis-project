import { useState } from "react";
import BikeRentOrder from "../BikeRentOrder/BikeRentOrder";
import LocalMediator from "../LocalMediator/LocalMediator";
import MedicineOrder from "../MedicineOrder/MedicineOrder";
import ParcelDelivery from "../ParcelDelivery/ParcelDelivery";
import PageTitle from "../../../utils/PageTitle";

const OrderHome = () => {
  const [selectedSection, setSelectedSection] = useState("parcel");

  const showMedicine = () => {
    setSelectedSection("medicine");
  };

  const showLocalMediator = () => {
    setSelectedSection("mediator");
  };

  const showBikeRent = () => {
    setSelectedSection("rent");
  };

  const showParcelDelivery = () => {
    setSelectedSection("parcel");
  };
  return (
    <div className="lg:mt-28 lg:mb-5  lg:mx-0">
      <PageTitle title="Order" />
      <div className="flex flex-col gap-2  ">
        <div className=" shadow-md card-bordered border-2 rounded-lg lg:flex justify-between  ps-5 lg:ps-0 py-2 mx-3 items-center lg:px-5 bg-white h-full  ">
          <div className="flex justify-start gap-2 items-center lg:ps-5">
            <h1 className="  font-semibold text-[#777E90] text-lg uppercase">
              Orders{" "}
            </h1>
            <i className="fa-solid fa-greater-than text-[10px] text-[#777E90] mt-1"></i>
            <div className="font-semibold lg:w-10 text-primary text-lg">
              {selectedSection}
            </div>
          </div>
          <div
            className={`${
              selectedSection === "parcel" ? "text-primary" : "text-[#999]"
            } flex mt-3 justify-start gap-2 items-center`}
          >
            <i className="fa-solid fa-truck "></i>
            <button
              className="text-left text-[1.1rem]  text-[#999] hover:text-[#38d39f]"
              onClick={showParcelDelivery}
            >
              Parcel delivery
            </button>
          </div>
          <div
            className={`${
              selectedSection === "rent" ? "text-primary" : "text-[#999]"
            } flex mt-3 justify-start gap-2 items-center`}
          >
            <i className="fa-solid fa-motorcycle "></i>
            <button
              className="text-left text-[1.1rem] my-2 text-[#999] hover:text-[#38d39f]"
              onClick={showBikeRent}
            >
              Bike Rent
            </button>
          </div>
          <div
            className={`${
              selectedSection === "medicine" ? "text-primary" : "text-[#999]"
            } flex mt-3 justify-start gap-2 items-center`}
          >
            <i className="fa-solid fa-box "></i>
            <button
              className="text-left text-[1.1rem] text-[#999] hover:text-[#38d39f]"
              onClick={showMedicine}
            >
              Medicine
            </button>
          </div>
          <div
            className={`${
              selectedSection === "mediator" ? "text-primary" : "text-[#999]"
            } flex mt-3 justify-start gap-2 items-center`}
          >
            <i className="fa-brands fa-telegram "></i>
            <button
              className="text-left text-[1.1rem] my-2 text-[#999] hover:text-[#38d39f]"
              onClick={showLocalMediator}
            >
              Local Mediator
            </button>
          </div>
        </div>

        {/* section 2.................... */}
        <div className=" lg:shadow-md lg:rounded-md lg:card-bordered mx-3 lg:border-2 lg:px-4">
          {selectedSection === "medicine" && (
            <div className="py-2 lg:mx-0 mx-2  lg:py-5 ">
              <h2 className="text-2xl text-[#777E90]">Medicine Order List:</h2>
            </div>
          )}
          {selectedSection === "mediator" && (
            <div className="py-2 lg:mx-0 mx-2   lg:py-5">
              <h2 className="text-2xl text-[#777E90]">
                Local Mediator Order List:
              </h2>
            </div>
          )}
          {selectedSection === "rent" && (
            <div className="py-2 lg:mx-0 mx-2   lg:py-5">
              <h2 className="text-2xl text-[#777E90] ">
                Bike Rent Order List:
              </h2>
            </div>
          )}
          {selectedSection === "parcel" && (
            <div className="py-2 lg:mx-0 mx-2   lg:py-5">
              <h2 className="text-2xl text-[#777E90]">
                Parcel Delivery Order List:
              </h2>
            </div>
          )}
          {selectedSection === "parcel" && <ParcelDelivery />}
          {selectedSection === "rent" && <BikeRentOrder />}
          {selectedSection === "medicine" && <MedicineOrder />}
          {selectedSection === "mediator" && <LocalMediator />}
        </div>
      </div>
    </div>
  );
};

export default OrderHome;
