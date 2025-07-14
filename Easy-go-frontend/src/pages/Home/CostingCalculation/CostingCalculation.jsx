import { useState } from "react";
import "./CostingCalculation.css";
export default function CostingCalculation() {
  const newDate = new Date().toISOString().split("T")[0];
  const [selected, setSelected] = useState("");
  return (
    <div className="bg-[#E3F9E7] rounded-md my-8 p-4 md:p-20">
      <div className="flex flex-col md:flex-row justify-evenly gap-7 md:items-start items-center">
        <div className="text-center lg:text-left w-full md:w-1/2">
          <h1 className="text-4xl font-bold">Calculate your costing</h1>
          <p className="py-6">
            Get Instant Clarity: Effortlessly Estimate Your Price with Our
            User-Friendly Calculator!
          </p>
        </div>
        <div className="w-full md:w-1/2 shadow-md bg-base-100 rounded-md p-8 md:p-5">
          <div className="flex flex-col gap-y-3">
            <div className="control-form">
              <label className="">
                <span className="label-text">
                  <i className="fa-regular fa-calendar-days mr-3 text-[#fff] bg-[#38BA9F] p-2 rounded-md"></i>
                  Booking Date
                </span>
                <br />
              </label>
              <input
                type="date"
                placeholder={newDate}
                min={newDate}
                value={selected}
                className="s-input mt-4"
                onChange={(e) => setSelected(e.target.value)}
              />
            </div>
            <div className="control-form">
              <label className="">
                <span className="label-text">
                  <i className="fa-solid fa-box mr-3  text-[#fff] bg-[#38BA9F] p-2 rounded-md"></i>
                  Type of services
                </span>
              </label>

              <select className="s-select mt-4">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
            </div>
            <div className="">
              <label className="label">
                <span className="label-text">
                  <i className="fa-solid fa-location-dot mr-3  text-[#fff] bg-[#38BA9F] p-2 rounded-md"></i>
                  Destination
                </span>
              </label>
            </div>
            <div className="flex flex-col md:flex-row gap-x-3 gap-y-3">
              {" "}
              <div className="w-full">
                <label className="">
                  <span className="label-text">From</span>
                </label>
                <select className="s-select mt-4">
                  <option value="">Place1</option>
                  <option value="">Place2</option>
                  <option value="">Place3</option>
                </select>
              </div>
              <div className="w-full">
                <label className="">
                  <span className="label-text">To</span>
                </label>
                <select className="s-select mt-4">
                  <option value="">Place1</option>
                  <option value="">Place2</option>
                  <option value="">Place3</option>
                </select>
              </div>
            </div>
            <div className=" mt-6">
              <button className="btn bg-[#3CBD96] w-28 capitalize h-10 text-[#fff]">
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
