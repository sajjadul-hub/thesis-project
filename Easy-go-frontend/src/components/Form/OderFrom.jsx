/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProductOrder } from "../../features/mediator/serviceApi";
import { addMedicineOrder } from "../../features/medicine/serviceApi";
import Swal from "sweetalert2";
import { mediatorclearCart } from "../../features/mediatorCart/mediatorCart";
import { clearCart } from "../../features/MedicineCart/cartSlice";
import axios from "axios";

const OderFrom = ({ handleNext }) => {
  const { name, email, _id } = useSelector((state) => state?.user?.currentUser);
  console.log(name);

  const { mediatorCart, total, quantity } = useSelector(
    (state) => state?.mediatorCart
  );
  const { products, medicineTotal, deliveryCharge, productquantity } =
    useSelector((state) => state?.cart);
  const [showCards, setShowCards] = useState(true);
  const [cod, setCod] = useState(false);
  const [paymentType, setPaymentType] = useState("COD");
  const { register, handleSubmit, formState } = useForm();
  const { errors, isValid } = formState;
  const showCard = (value) => {
    if (value === "card") {
      setShowCards(false);
      setCod(true);
      cod;
    } else {
      setShowCards(true);
      setCod(false);
    }
  };
  const productTotal = total + medicineTotal;
  const totalPrice = Number(productTotal) + deliveryCharge;
  const totalQuantity = quantity + productquantity;
  const mediator = mediatorCart.map((item) => ({
    product: item._id,
    quantity: item.quantity,
  }));
  const medicines = products.map((item) => ({
    medicine: item._id,
    quantity: item.quantity,
  }));

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      let shouldMakeAPICall = false;
      const mediatorOrder = {
        ...data,
        products: mediator,
        totalPrice,
        deliveryCharge,
        user: _id,
        quantity: totalQuantity,
      };

      if (mediator.length > 0) {
        addProductOrder(dispatch, mediatorOrder);
        shouldMakeAPICall = true;
      }

      const medicineOrder = {
        ...data,
        medicines,
        user: _id,
        totalPrice,
        deliveryCharge,
        quantity: totalQuantity,
      };

      if (medicines.length > 0) {
        addMedicineOrder(dispatch, medicineOrder);
        shouldMakeAPICall = true;
      }

      if (shouldMakeAPICall) {
        dispatch(mediatorclearCart());
        dispatch(clearCart());
        handleNext();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };
  const handlePayment = async () => {
    try {
      const paymentPayload = {
        _id,
        name,
        email,
        address: "sdkfhklasfh",
        phoneNumber: "015938375235",
        mediator,
        medicines,
        totalPrice,
        deliveryCharge,
        quantity: totalQuantity,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/payment",
        paymentPayload
      );
      dispatch(mediatorclearCart());
      dispatch(clearCart());
      if (res.data) {
        window.location.href = res.data.redirect;
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: error.message || "An error occurred during payment.",
      });
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold ms-12  mt-10 mb-8">Shipping Address</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex items-center justify-center">
          <div className="md:w-72 flex flex-col">
            <label className="text-base font-semibold leading-none text-gray-800">
              Name
            </label>
            <input
              type="text"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              {...register("name", {
                required: true,
              })}
              value={name}
            />
          </div>
          <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
            <label className="text-base font-semibold leading-none text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              {...register("email", {
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
              value={email}
            />
          </div>
        </div>
        <div className="md:flex items-center mt-8 justify-center">
          <div className="md:w-72 flex flex-col">
            <label className="text-base font-semibold leading-none text-gray-800">
              Phone No
            </label>
            <input
              type="phoneNumber"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 "
              {...register("phoneNumber", {
                required: true,
                pattern: /^01[3-9]\d{8}$/,
                message: "give the valid phone number",
              })}
            />
            {errors.phoneNumber && <p> {errors.phoneNumber.message}</p>}
          </div>
          <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
            <label className="text-base font-semibold leading-none text-gray-800">
              Address <span className="text-gray-400"> (with city)</span>
            </label>
            <input
              type="address"
              className="text-base leading-none  text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 5,
                  message: "Address is too short",
                },
                maxLength: {
                  value: 100,
                  message: "Address is too long",
                },
                // You can add more validation rules here, such as pattern for format.
              })}
            />
            {errors.address && (
              <p className="error-message">{errors.address.message}</p>
            )}
          </div>
        </div>

        {isValid ? (
          <div>
            <div className="flex justify-between px-12 mt-6">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="radio-5"
                  className="radio radio-success"
                  value="COD"
                  onChange={(event) => setPaymentType(event.target.value)}
                  checked={paymentType === "COD"}
                  onClick={(e) => showCard(e.target.value)}
                />
                <h1>Cash On Delivery</h1>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="radio-5"
                  className="radio radio-success"
                  value="card"
                  onChange={(event) => setPaymentType(event.target.value)}
                  checked={paymentType === "card"}
                  onClick={(e) => showCard(e.target.value)}
                />
                <h1>Pay online</h1>
              </div>
            </div>
            {showCards && (
              <div className=" flex items-center justify-center w-full">
                <input
                  type="submit"
                  className="mt-9 hover:text-black text-base font-semibold leading-none text-white py-4 px-10 bg-[#38d39f] rounded hover:bg-[#57e0b3] focus:ring-2 focus:ring-offset-2  focus:outline-none cursor-pointer"
                  value="CHECKOUT"
                  disabled={!isValid}
                />
              </div>
            )}
            {cod && (
              <div className=" flex items-center justify-center w-full">
                <input
                  onClick={handlePayment}
                  className="mt-9 hover:text-black text-base font-semibold leading-none text-white  bg-[#38d39f] rounded hover:bg-[#57e0b3] focus:ring-2 py-4 px-10 text-center w-44 focus:ring-offset-2  focus:outline-none cursor-pointer"
                  value="GATWAY"
                  disabled={!isValid}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-primary mt-4 text-center text-lg">
            {" "}
            Complete the details
          </p>
        )}
      </form>
    </div>
  );
};

export default OderFrom;
