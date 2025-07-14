import "./BikeRent.css";
import star1 from "../../../assets/ServicesImg/starImg.png";
import star2 from "../../../assets/ServicesImg/starsmall.png";
import bgImg from "../../../assets/PosterImg/postBg2.png";
import PageTitle from "../../../utils/PageTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { B_Schema } from "../../../Schema/Schema";
import Banner from "../../Home/Banner";
import { addBooking } from "../../../features/bike-rent/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BikeRent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(B_Schema) });
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      const formData = { ...data, total_amount: 2500, user: currentUser?._id };
      addBooking(dispatch, formData);
      navigate("/payment-success");
    } catch (error) {
      console.log(error);
    }
  };
  if (errors) {
    console.log(errors);
  }

  return (
    <div className="container_ p-10 relative overflow-hidden">
      <Banner category={"bike-rent"} />
      <PageTitle title="Bike Rent" />
      <div className="bg-right absolute right-[-40px] top-[-58px] ">
        <img src={bgImg} alt="" className="w-[150px]" />
      </div>
      <div className="star absolute left-[7px] top-[409px]">
        <img src={star2} alt="" className="w-[20px]" />
      </div>
      <div className="bg-left absolute left-[-40px] top-[412px]">
        <img src={bgImg} alt="" className="w-[150px] rotate-180" />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start my-[20px] max-w-5xl mx-auto">
        <div className="title w-full md:w-1/2 mx-auto">
          <h1 className="text[#204945] font-bold sm:text-[36px] uppercase md:text-[28px] text-[22px]">
            make your travel plan
          </h1>
        </div>
        <div className="short-desc w-full md:w-1/2 mx-auto">
          <p className="text-[#777E90] text-xl relative">
            <img
              src={star1}
              alt=""
              className="absolute star right-[27px] top-[-27px] w-[40px]"
            />
            Customized travel plans crafted just for you. Unforgettable
            experiences, seamless logistics, and expert recommendations. Embark
            on your dream journey with us!
          </p>
        </div>
      </div>
      {/* Bike Rent Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 p-4 rounded-md max-w-5xl mx-auto"
      >
        <div>
          <h1 className="text[#204945] font-bold sm:text-[36px] md:text-[28px] text-[22px] uppercase text-center mb-3">
            Help us to Give your information
          </h1>
        </div>
        <div className="form-group">
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Name</span>
            </div>
            <div>
              <input
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.name && (
                <p role="alert" className="text-[#b83535]">
                  {errors?.name?.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">NID</span>
            </div>
            <div>
              <input
                {...register("nid", { required: true, maxLength: 15 })}
                aria-invalid={errors.nid ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.nid && (
                <p role="alert" className="text-[#b83535]">
                  {errors.nid.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Phone number</span>
            </div>
            <div>
              <input
                {...register("phoneNumber", { required: true, maxLength: 11 })}
                aria-invalid={errors.phoneNumber ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.phoneNumber && (
                <p role="alert" className="text-[#b83535]">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Driving License</span>
            </div>
            <div>
              <input
                {...register("drivingLicense", { required: true })}
                aria-invalid={errors.drivingLicense ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.drivingLicense && (
                <p role="alert" className="text-[#b83535]">
                  {errors.drivingLicense.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">From</span>
            </div>
            <div className="select">
              <select
                {...register("from", { required: true })}
                aria-invalid={errors.from ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              >
                <option selected disabled value="Rowangchari">
                  From
                </option>
                <option value="Rowangchari">Rowangchari</option>
                <option value="Lama">Lama</option>
                <option value="Thanchi">Thanchi</option>
                <option value="Ruma">Ruma</option>
              </select>
              {errors?.from && (
                <p role="alert" className="text-[#b83535]">
                  {errors.from.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Destination</span>
            </div>
            <div className="select">
              <select
                {...register("destination", { required: true })}
                aria-invalid={errors.destination ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              >
                <option selected disabled value="destination">
                  Destination
                </option>
                <option value="Ruma">Ruma</option>
                <option value="Thanchi">Thanchi</option>
                <option value="Rowanchari">Rowanchari</option>
              </select>
              {errors?.destination && (
                <p role="alert" className="text-[#b83535]">
                  {errors.destination.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Fuel</span>
            </div>
            <div>
              <input
                {...register("fuel")}
                placeholder="1"
                type="number"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.fuel && (
                <p role="alert" className="text-[#b83535]">
                  {errors.fuel.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Start Time</span>
            </div>
            <div className="select">
              <select
                {...register("start_time", { required: true })}
                aria-invalid={errors.start_time ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              >
                <option selected disabled value="6am">
                  6am
                </option>
                <option value="6am">6am</option>
                <option value="7am">7am</option>
                <option value="8am">8am</option>
              </select>
              {errors?.start_time && (
                <p role="alert" className="text-[#b83535]">
                  {errors.start_time.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">End Time</span>
            </div>
            <div className="select">
              <select
                {...register("end_time", { required: true })}
                aria-invalid={errors.end_time ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              >
                <option value="5pm">5pm</option>
                <option value="6pm">6pm</option>
                <option value="8pm">8pm</option>
              </select>
              {errors?.end_time && (
                <p role="alert" className="text-[#b83535]">
                  {errors.end_time.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Rider</span>
            </div>
            <div className="select">
              <select
                className="w-full bg-transparent outline-none"
                {...register("rider", { required: true })}
                aria-invalid={errors.rider ? "true" : "false"}
              >
                <option disabled defaultValue="select rider">
                  Select Rider
                </option>
                <option value="Male Rider">Male Rider</option>
                <option value="Female Rider">Female Rider</option>
              </select>
              {errors?.rider && (
                <p role="alert" className="text-[#b83535]">
                  {errors.rider.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">rider</span>
            </div>
            <div className="select">
              <select
                {...register("gender", { required: true })}
                aria-invalid={errors.gender ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors?.gender && (
                <p role="alert" className="text-[#b83535]">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Start Date</span>
            </div>
            <div>
              <input
                {...register("start_date", { required: true })}
                aria-invalid={errors.start_date ? "true" : "false"}
                type="date"
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.start_date && (
                <p role="alert" className="text-[#b83535]">
                  {errors.start_date.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">End Date</span>
            </div>
            <div>
              <input
                {...register("end_date", { required: true })}
                type="date"
                aria-invalid={errors.end_date ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              />
              {errors?.end_date && (
                <p role="alert" className="text-[#b83535]">
                  {errors.end_date.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-[#E3F9E7] flex justify-between p-2 rounded-md items-start md:items-center flex-col md:flex-row">
            <div>
              <span className="text-[#204945] font-bold">Bike type</span>
            </div>
            <div className="select">
              <select
                {...register("bikeType", { required: true })}
                aria-invalid={errors.bikeType ? "true" : "false"}
                className="w-full rounded-lg outline-none bg-[#A3DDD7]"
              >
                <option value="Ladies Bike">Ladies Bike</option>
                <option value="Man Bike">Man Bike</option>
              </select>
              {errors?.bikeType && (
                <p role="alert" className="text-[#b83535]">
                  {errors.bikeType.message}
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
          <div className="flex items-center my-5">
            <input
              id="link-checkbox"
              type="checkbox"
              {...register("payLater")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium">
              Pay Cash
            </label>
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
