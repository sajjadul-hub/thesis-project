import { useEffect } from "react";
import ReviewForm from "../../../components/Form/ReviewForm";
import ReviewModal from "../Components/ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../../features/bike-rent/serviceApi";
import { NotFound, OrderLoading } from "../helper";

const BikeRentOrder = () => {
  const { bookings, isLoading } = useSelector((state) => state?.bikeRent);
  const { _id } = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (_id) {
      getBooking(dispatch, _id);
    }
  }, [_id, dispatch]);

  return (
    <div className="">
      {/* Mobile view/////////////////////// */}
      <div className="lg:hidden">
        {isLoading ? (
          <OrderLoading />
        ) : (
          <>
            {bookings?.length === 0 ? (
              <NotFound content={"Sorry, You did't Rent any Bike."} />
            ) : (
              <>
                {bookings?.map((item) => (
                  <div
                    key={item?._id}
                    className=" card-bordered px-3 py-5 mb-10 rounded-lg mx-1"
                  >
                    <div className="flex flex-col justify-center items-center">
                      <div>
                        <h1 className=" font-bold text-xl">Ride ID:</h1>
                      </div>
                      <div>
                        <p>{item?._id}</p>
                      </div>
                    </div>

                    <div className=" flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold text-lg">Rider Name</h1>
                      </div>
                      <div>
                        <h1>{item?.name}</h1>
                      </div>
                    </div>
                    <div className="">
                      <div>
                        <h1 className=" font-bold text-lg">Ride Distance:</h1>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex justify-between gap-2 ">
                          <h1 className="font-semibold">From:</h1>
                          <p>{item?.from}</p>
                        </div>
                        <div className="flex justify-between gap-2">
                          <h1 className="font-semibold">Destination:</h1>
                          <p>{item?.destination}</p>
                        </div>
                      </div>
                    </div>
                    <div className="  my-4">
                      <div>
                        <h1 className=" font-bold text-lg">Ride Duration:</h1>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex justify-start gap-1 ">
                            <h1 className="font-semibold">Start Date:</h1>
                            <p>{item?.start_date.slice(0, 10)}</p>
                          </div>
                          <div className="flex justify-start gap-2 ">
                            <h1 className="font-semibold">Start Time:</h1>
                            <p>{item?.start_time}</p>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <div className="flex justify-start gap-1 mt-2">
                            <h1 className="font-semibold">End Date:</h1>
                            <p>{item?.end_date.slice(0, 10)}</p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <h1 className="font-semibold">End Time:</h1>
                            <p>{item?.end_time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold text-lg">Payment Status: </h1>
                      </div>
                      <div
                        className={`${
                          item?.paymentStatus === "Pending"
                            ? "text-gray-400"
                            : "text-primary"
                        } `}
                      >
                        <p>{item?.paymentStatus}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold text-lg">Rent Status: </h1>
                      </div>
                      <div
                        className={`${
                          item?.rentStatus === "Pending"
                            ? "text-gray-400"
                            : "text-primary"
                        } `}
                      >
                        <p>{item?.rentStatus}</p>
                      </div>
                    </div>
                    <div className=" flex justify-between items-center">
                      <div>
                        <h1 className=" font-bold text-lg">Rent Price: </h1>
                      </div>

                      <div className=" ">
                        <h1>
                          <span className="font-extrabold">৳</span>
                          {item?.total_amount}
                        </h1>
                      </div>
                    </div>
                    <div className="flex  justify-between mt-4 ">
                      <div className="font-bold">Action</div>
                      <ReviewModal />
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      {/* desktop-View.......................... */}
      {/* desktop-View.......................... */}
      {bookings.length > 0 && (
        <div className="hidden lg:grid grid-cols-12 card-bordered rounded px-2 py-3 font-bold ">
          <div className=" col-span-3">
            <h1>Ride ID</h1>
          </div>
          <div className=" col-span-2">
            <h1>Rider Name</h1>
          </div>
          <div className=" col-span-2">
            <h1>Ride Distance</h1>
          </div>
          <div className=" col-span-2">
            <h1>Ride Duration</h1>
          </div>
          <div className=" col-span-1">
            <h1>Payment Status </h1>
          </div>
          <div className=" col-span-1">
            <h1>Rent Status </h1>
          </div>
          <div className=" col-span-1">
            <h1>Rent Price </h1>
          </div>
        </div>
      )}

      {/* list items................... */}
      <div className="hidden lg:block">
        {bookings.length === 0 ? (
          <NotFound content={"Sorry, You did't Rent any Bike."} />
        ) : (
          <>
            {isLoading ? (
              <OrderLoading />
            ) : (
              <>
                {bookings?.map((item) => (
                  <div
                    key={item?._id}
                    className="grid items-center grid-cols-12 card-bordered my-3 px-2 rounded py-3 font-semibold "
                  >
                    <div className=" col-span-3 ">
                      <p>{item?._id}</p>
                    </div>
                    <div className=" col-span-2">
                      <h1>{item?.name}</h1>
                    </div>
                    <div className="col-span-2">
                      <div className="flex justify-start gap-2 ">
                        <h1 className="font-bold">From:</h1>
                        <p>{item?.from}</p>
                      </div>
                      <div className="flex justify-start gap-2">
                        <h1 className="font-bold">Destination:</h1>
                        <p>{item?.destination} </p>
                      </div>
                    </div>
                    <div className=" col-span-2">
                      <div className="flex justify-start gap-2 ">
                        <h1 className="font-bold">Start Date:</h1>
                        <p>{item?.start_date.slice(0, 10)}</p>
                      </div>
                      <div className="flex justify-start gap-2 ">
                        <h1 className="font-bold">Start Time:</h1>
                        <p>{item?.start_time}</p>
                      </div>
                      <div className="flex justify-start gap-2 mt-2">
                        <h1 className="font-bold">End Date:</h1>
                        <p>{item?.end_date.slice(0, 10)}</p>
                      </div>
                      <div className="flex justify-start gap-2">
                        <h1 className="font-bold">End Time:</h1>
                        <p>{item?.end_time.slice(0, 10)}</p>
                      </div>
                    </div>
                    <div
                      className={`${
                        item?.paymentStatus === "Pending"
                          ? "text-gray-400"
                          : "text-primary"
                      } col-span-1`}
                    >
                      <h1>
                        <p>{item?.paymentStatus}</p>
                      </h1>
                    </div>
                    <div
                      className={`${
                        item?.rentStatus === "Pending"
                          ? "text-gray-400"
                          : "text-primary"
                      } col-span-1`}
                    >
                      <h1>
                        <p>{item?.rentStatus}</p>
                      </h1>
                    </div>
                    <div className=" col-span-1">
                      <h1>
                        <b>৳</b> {item?.total_amount}
                      </h1>
                    </div>
                    {(item?.paymentStatus || item?.rentStatus) === "Pending" &&
                    item.isReviewed === true ? (
                      <>
                        <button
                          title="Disable "
                          className="p-2 rounded-full bg-gray-300 text-[15px] flex justify-center cursor-pointer   "
                        >
                          Review
                        </button>
                      </>
                    ) : (
                      <button
                        className="p-2 hover:text-black text-[15px] flex justify-center cursor-pointer    text-white  bg-primary rounded-full hover:bg-[#57e0b3]"
                        onClick={() =>
                          document.getElementById("my_modal_2").showModal()
                        }
                      >
                        Review
                      </button>
                    )}
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle bg-primary absolute right-2 top-2">
                            ✕
                          </button>
                        </form>

                        <ReviewForm orderId={item._id} item="bike" />
                      </div>
                    </dialog>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BikeRentOrder;
