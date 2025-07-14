import "./ProductDelivery.css";
import star1 from "../../../assets/ServicesImg/starImg.png";
import star2 from "../../../assets/ServicesImg/starsmall.png";
import bgImg from "../../../assets/PosterImg/postBg2.png";
import PageTitle from "../../../utils/PageTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { P_Schema } from "../../../Schema/Schema";
import Banner from "../../Home/Banner";
import { useDispatch, useSelector } from "react-redux";
import { addParcel } from "../../../features/parcel/serviceApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ProductDelivery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(P_Schema) });
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      const parcel = { ...data, total_amount: 2500, user: currentUser?._id };
      addParcel(dispatch, parcel);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your rent booked Successfully",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/payment-success");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error,
      });
    }
  };

  return (
    <div className="container_ p-10 relative overflow-hidden">
      <PageTitle title="Product Delivery" />
      <Banner category={"parcel"} />
      <div className="bg-right absolute right-[-40px] top-[-58px] ">
        <img src={bgImg} alt="" className="w-[150px]" />
      </div>
      <div className="star absolute left-[7px] top-[409px]">
        <img src={star2} alt="" className="w-[20px]" />
      </div>
      <div className="bg-left absolute left-[-40px] top-[412px]">
        <img src={bgImg} alt="" className="w-[150px] rotate-180" />
      </div>
      <div className="short-desc mb-6 md:w-1/2 w-full mx-auto">
        <h1 className="text[#204945] font-bold sm:text-[36px] uppercase md:text-[28px] text-[22px] relative text-center">
          <img
            src={star1}
            alt=""
            className="absolute star right-[27px] top-[-27px] w-[40px]"
          />
          Elevating Your Deliveries: Seamlessly Connecting Sender and Recipient
        </h1>
      </div>

      {/* Delivery Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 p-4 rounded-md max-w-5xl mx-auto"
      >
        <div>
          <h1 className="text[#204945] font-bold text-[22px] md:text-[28px] sm:text-[33px] uppercase text-center mb-3">
            Help us to Give your information
          </h1>
        </div>
        <div className="form-group">
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Sender Name</span>
            </div>
            <div>
              <input
                {...register("sender_name")}
                type="text"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.sender_name && (
                <p role="alert" className="text-[#b83535]">
                  {errors?.sender_name?.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Sending Date</span>
            </div>
            <div>
              <input
                {...register("sending_date")}
                type="date"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.sending_date && (
                <p role="alert" className="text-[#b83535]">
                  {errors?.sending_date?.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Primary number</span>
            </div>
            <div>
              <input
                {...register("primary_num")}
                type="text"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.primary_num && (
                <p role="alert" className="text-[#b83535]">
                  {errors?.primary_num?.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Secondary number</span>
            </div>
            <div>
              <input
                {...register("secondary_num")}
                type="text"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.secondary_num && (
                <p role="alert" className="text-[#b83535]">
                  {errors.secondary_num.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Sender Address</span>
            </div>
            <div>
              <input
                {...register("sender_address")}
                type="text"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.sender_address && (
                <p role="alert" className="text-[#b83535]">
                  {errors.sender_address.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Receiver Name</span>
            </div>
            <div>
              <input
                {...register("receiver_name")}
                type="text"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.receiver_name && (
                <p role="alert" className="text-[#b83535]">
                  {errors.receiver_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Receiver Phone</span>
            </div>
            <div>
              <input
                {...register("receiver_phone")}
                type="text"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.receiver_phone && (
                <p role="alert" className="text-[#b83535]">
                  {errors.receiver_phone.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Receiver Address</span>
            </div>
            <div>
              <input
                {...register("receiver_address")}
                type="text"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.receiver_address && (
                <p role="alert" className="text-[#b83535]">
                  {errors.receiver_address.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">
                Weight Of Product(KG)
              </span>
            </div>
            <div className="select">
              <select
                {...register("p_weight")}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              >
                <option value="1">1+</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {errors?.p_weight && (
                <p role="alert" className="text-[#b83535]">
                  {errors.p_weight.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Product type</span>
            </div>
            <div className="select">
              <select
                {...register("p_type")}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              >
                <option value="place">Product type 1</option>
                <option value="place">Product type 2</option>
              </select>
              {errors?.p_type && (
                <p role="alert" className="text-[#b83535]">
                  {errors.p_type.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="md:w-80 w-full mx-auto">
          <div className="flex justify-evenly bg-[#A3DDD7] my-3 rounded-md p-2">
            <h1 className="font-bold">Total Amount</h1>
            <span className="font-bold bg-[#fff] px-5 rounded-xl">
              BDT 2500
            </span>
          </div>
          <div className="bg-[#3CBD96] py-2 flex justify-center items-center rounded-md cursor-pointer">
            <button
              type="submit"
              className="text-[#fff] font-extrabold text-[28px]"
            >
              Pay Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
