/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import { startTransition, useEffect, useState } from "react";
import OrderList from "./OrderList";
import { useSelector } from "react-redux";
import OrderDetails from "./OrderDetails";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.css";
import Lottie from "lottie-react";
import animationData from "../../../public/success.json";
const steps = ["Shopping", "Checkout", "Success"];

const StepperHome = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const { mediatorCart, total, quantity } = useSelector(
    (state) => state?.mediatorCart
  );
  // console.log(mediatorCart);

  const { products, medicineTotal, deliveryCharge, productquantity } =
    useSelector((state) => state?.cart);
  console.log(products);
  const productTotal = total + medicineTotal;
  const totalPrice = Number(productTotal) + deliveryCharge;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      setIsOrderComplete(true);
    }
  };
  const totalQuantity = quantity + productquantity;

  // useEffect(() => {
  //   if (!(products.length > 0 || mediatorCart.length > 0)) {
  //     navigate("/");
  //   }
  // }, [mediatorCart, products]);

  useEffect(() => {
    if (currentStep === 2) {
      handleNext();
    }
  }, [currentStep]);

  return (
    <div className=" lg:p-4 lg:flex justify-center items-start mt-20 gap-3 lg:w-[80%] w-[93%] mx-auto">
      <div className="bg-white md:w-[70%] rounded-lg shadow card-bordered ">
        <div className="p-4">
          <div className=" border-gray-200 py-2">
            {isOrderComplete ? (
              <div className="text-2xl font-bold text-[#3CBD96] mb-4 text-center py-24 lg:w-[60vw] mx-auto">
                <div className="flex justify-center items-center">
                  <Lottie
                    className="w-[150px] h-[150px] text-center"
                    animationData={animationData}
                    loop={false}
                    autoplay={true}
                  />
                  <div></div>
                </div>

                <p className="text-2xl pt-7 pb-5">
                  Your order is complete successfully
                </p>
                <Link
                  className="text-center bg-primary text-white lg:w-40 text-lg mx-auto rounded p-2 hover:text-black"
                  to="/order"
                >
                  Order Tracking
                </Link>
              </div>
            ) : (
              <ul className="steps  lg:ms-auto  p-10 lg:p-0 steps-vertical lg:steps-horizontal lg:w-[600px]   ">
                {steps?.map((step, index) => (
                  <li
                    key={step}
                    // data-content={`${index <= currentStep ? "✓" : "?"}`}
                    data-content={step}
                    className={`step   ${
                      index <= currentStep
                        ? "step-success  text-primary "
                        : "text-gray-200 "
                    } ${index < currentStep ? "" : ""}`}
                  ></li>
                ))}
              </ul>
            )}

            {currentStep === 0 && (
              <div className="lg:mt-5 px-3 lg:px-0">
                <OrderList mediatorCart={mediatorCart} products={products} />
              </div>
            )}
            {currentStep === 1 && (
              <div className="">
                <OrderDetails handleNext={handleNext} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {totalPrice ? (
          <div
            style={{ display: isOrderComplete ? "none" : "" }}
            className="flex flex-col  border-t-[2px]  shadow rounded-lg p-2 lg:w-[475px] mt-4 lg:mt-auto"
          >
            <div className="flex justify-between pt-3 px-4">
              <div>
                <h1 className="text-brand-dark  lg:text-[18px] lg:leading-7  mb-1.5 text-lg text-brand-dark ">
                  <i className="fa-solid fa-hand-holding "></i> Total quantity{" "}
                </h1>
              </div>
              <div className="text-lg ">{totalQuantity}</div>
            </div>
            <div className="flex justify-between pt-3 px-4">
              <div>
                <h1 className="text-brand-dark  lg:text-[18px] lg:leading-7  mb-1.5 text-lg text-brand-dark ">
                  <i className="fa-solid fa-money-bill"></i> Subtotal
                </h1>
              </div>
              <div className="text-lg">
                <b className="text-[28px]">৳</b> {totalPrice}
              </div>
            </div>
            <div className="flex justify-between pt-3 px-4">
              <div>
                <h1 className="text-brand-dark  lg:text-[18px] lg:leading-7  mb-1.5 text-lg text-brand-dark ">
                  <i className="fa-solid fa-truck-fast"></i>{" "}
                  <br className="lg:hidden" /> (only For Bandarban)
                </h1>
              </div>
              <div className="text-lg ">
                <b className="text-[28px]">৳</b>
                {deliveryCharge}
              </div>
            </div>
            <div className="flex justify-between pt-3 px-4">
              <div>
                <h1 className=" lg:text-[22px] lg:leading-7 font-semibold mb-1.5 text-lg ">
                  <i className="fa-solid fa-money-bill"></i> Total{" "}
                </h1>
              </div>
              <div className="text-lg ">
                <b className="text-[28px]">৳ {totalPrice}</b>
              </div>
            </div>

            {currentStep === 0 && (
              <button
                onClick={handleNext}
                to="/Checkout"
                className="w-[55vw] uppercase text-[15px] bg-[#3CBD96] hover:text-black hover:font-bold text-white font-semibold lg:w-[32vw] lg:h-[8vh] h-[5vh] rounded lg:py-2 mb-3 lg:mb-auto px-5 mt-4 mx-auto text-center flex justify-center items-center"
              >
                Checkout
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default StepperHome;
