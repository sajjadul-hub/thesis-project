import { useEffect } from "react";
import ReviewModal from "../Components/ReviewModal";
import ReviewForm from "../../../components/Form/ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { getParcelOrder } from "../../../features/parcel/serviceApi";
import { NotFound, OrderLoading } from "../helper";

const ParcelDelivery = () => {
  const { percels, isLoading } = useSelector((state) => state?.parcel);
  const { _id } = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (_id) {
      getParcelOrder(dispatch, _id);
    }
  }, [_id, dispatch]);

  return (
    <div>
      <div className="lg:hidden">
        {isLoading ? (
          <OrderLoading />
        ) : (
          <>
            {percels.length === 0 ? (
              <NotFound content={"Sorry, You did't Delivery any Parcel."} />
            ) : (
              <>
                {percels?.map((item) => (
                  <div
                    key={item._id}
                    className=" card-bordered px-2 py-5 mb-10 rounded-lg mx-1"
                  >
                    <div className="flex flex-col justify-center items-center">
                      <div>
                        <h1 className=" font-bold text-xl">Product ID:</h1>
                      </div>

                      <div>
                        <p className="  ">{item?._id}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold">Product Type</h1>
                      </div>

                      <div className=" relative right-[-1px]">
                        <p className=" ">{item?.p_type}</p>
                      </div>
                    </div>
                    <div className=" ">
                      <div>
                        <h1 className=" font-bold uppercase mb-2">Sender :</h1>
                      </div>

                      <div className="flex justify-between px-3">
                        <div>
                          <h1>{item?.sender_name} </h1>
                        </div>
                        <div>
                          <h1>{item?.secondary_num} </h1>
                        </div>
                        <div>
                          <h1>{item?.sender_address} </h1>
                        </div>
                      </div>
                    </div>
                    <div className="  my-4">
                      <div>
                        <h1 className=" font-bold uppercase mb-3">Receiver</h1>
                      </div>

                      <div className="flex justify-between px-3">
                        <div>
                          <h1>{item?.receiver_name} </h1>
                        </div>
                        <div>
                          <h1>{item?.receiver_phone} </h1>
                        </div>
                        <div>
                          <h1> {item?.receiver_address}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className=" font-bold">Weight Of Product(KG)</h1>
                      </div>

                      <div className=" relative right-[69px]">
                        <h1>{item?.p_weight}</h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold">Product type</h1>
                      </div>
                      <div className=" relative right-[40px]">
                        <h1>{item?.p_type}</h1>
                      </div>
                    </div>

                    <div className="flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold">Parcel Status </h1>
                      </div>
                      <div
                        className={`${
                          item?.parcelStatus === "Pending"
                            ? "text-gray-400"
                            : "text-primary"
                        } relative right-[20px]`}
                      >
                        <h1>{item?.parcelStatus}</h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h1>
                          <h1 className=" font-bold">Payment Status </h1>{" "}
                        </h1>
                      </div>
                      <div
                        className={`${
                          item?.paymentStatus === "Pending"
                            ? "text-gray-400"
                            : "text-primary"
                        } relative right-[20px]`}
                      >
                        <h1>{item?.paymentStatus}</h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold">Booking Price </h1>
                      </div>
                      <div className=" relative right-[37px]">
                        <h1>
                          <b>৳</b> {item?.total_amount}
                        </h1>
                      </div>
                    </div>
                    <div className="flex  justify-between mt-4 ">
                      <div className="font-bold">Action</div>
                      <div className="me-8">
                        <ReviewModal />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Desktop view//////////////////////////////////////// */}
      {/* Desktop view//////////////////////////////////////// */}
      {percels.length > 0 && (
        <div className=" card-bordered rounded px-2 hidden lg:grid grid-cols-12  py-3 font-bold ">
          <div className=" col-span-2">
            <h1>Product ID</h1>
          </div>
          <div className=" ms-2  col-span-1">
            <h1>Product Name</h1>
          </div>
          <div className=" ms-2 col-span-2">
            <h1>Sender</h1>
          </div>
          <div className="mb-[47px] lg:mb-auto  col-span-2">
            <h1>Receiver</h1>
          </div>
          <div className="lg:ms-[-30px] col-span-1">
            <h1>Weight Of Product(KG)</h1>
          </div>

          <div className=" col-span-1">
            <h1>Product type</h1>
          </div>

          <div className=" col-span-1">
            <h1>Shipping Status </h1>
          </div>
          <div className=" col-span-1">
            <h1>Payment Status </h1>
          </div>
          <div className=" col-span-1">
            <h1>Booking Price </h1>
          </div>
        </div>
      )}

      {/* list items................... */}
      <div className="hidden lg:block">
        {isLoading ? (
          <OrderLoading />
        ) : (
          <>
            {percels.length === 0 ? (
              <NotFound content={"Sorry, You did't Delivery any Parcel."} />
            ) : (
              <>
                {percels?.map((item) => (
                  <div
                    key={item?._id}
                    className="grid items-center lg:grid-cols-12 px-2 my-3 rounded card-bordered py-3 font-semibold "
                  >
                    <div className=" col-span-2  ">
                      <p className=" uppercase text-sm">{item?._id}</p>
                    </div>
                    <div className="ms-2 col-span-1">
                      <h1>{item?.p_type}</h1>
                    </div>
                    <div className=" ms-2  col-span-2">
                      <h1>{item?.sender_name} </h1>
                      <h1>{item?.secondary_num} </h1>
                      <h1>{item?.sender_address} </h1>
                    </div>
                    <div className=" col-span-2">
                      <h1>{item?.receiver_name} </h1>
                      <h1>{item?.receiver_phone} </h1>
                      <h1> {item?.receiver_address}</h1>
                    </div>
                    <div className=" col-span-1">
                      <h1>{item?.p_weight}</h1>
                    </div>
                    <div className=" col-span-1">
                      <h1>{item?.p_type}</h1>
                    </div>

                    <div
                      className={`${
                        item?.parcelStatus === "Pending"
                          ? "text-gray-400"
                          : "text-primary"
                      } col-span-1`}
                    >
                      <h1>{item?.parcelStatus}</h1>
                    </div>
                    <div
                      className={`${
                        item?.paymentStatus === "Pending"
                          ? "text-gray-400"
                          : "text-primary"
                      } col-span-1`}
                    >
                      <h1>{item?.paymentStatus}</h1>
                    </div>
                    <div className=" col-span-1">
                      <h1>
                        <b>৳</b> {item?.total_amount}
                      </h1>
                    </div>
                    {item?.paymentStatus === "Paid" &&
                    item?.parcelStatus === "Shipped" &&
                    item?.isReviewed === false ? (
                      <button
                        className="p-2 hover:text-black text-[15px] flex justify-center cursor-pointer    text-white  bg-primary rounded-full hover:bg-[#57e0b3]"
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${item._id}`)
                            .showModal()
                        }
                      >
                        Review
                      </button>
                    ) : (
                      item?.isReviewed === true && (
                        <button
                          title="Disable"
                          className="p-2 rounded-full bg-gray-300 text-[15px] flex justify-center cursor-pointer   "
                        >
                          Reviewed
                        </button>
                      )
                    )}
                    <dialog id={`my_modal_${item._id}`} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle bg-primary absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <ReviewForm orderId={item._id} item="parcel" />
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

export default ParcelDelivery;
