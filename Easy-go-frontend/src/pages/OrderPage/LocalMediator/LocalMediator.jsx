import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../../../components/Form/ReviewForm";
import ReviewModal from "../Components/ReviewModal";
import { useEffect, useState } from "react";
import { getMediatorsOrder } from "../../../features/mediator/serviceApi";
import { NotFound, OrderLoading } from "../helper";
const LocalMediator = () => {
  const { mediatorsOrder, isLoading } = useSelector((state) => state?.mediator);
  const { _id } = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (_id) {
      getMediatorsOrder(dispatch, _id);
    }
  }, [_id, dispatch]);

  const [mediatorOrder, setMediatorOrder] = useState(null);

  const openDetailsModal = (order, type) => {
    setMediatorOrder(order);
    if (type === "lg") {
      document.getElementById("my_modal_1").showModal();
    } else {
      document.getElementById("my_modal_5").showModal();
    }
  };

  return (
    <div className="">
      {/* Mobile view................ */}

      <div className="lg:hidden">
        {isLoading ? (
          <OrderLoading />
        ) : (
          <>
            {mediatorsOrder.length === 0 ? (
              <NotFound content={"Sorry, You did't Order any Product."} />
            ) : (
              <>
                {mediatorsOrder?.map((item) => (
                  <div
                    key={item?._id}
                    className=" card-bordered px-3 py-5 mb-10 rounded-lg mx-1"
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
                        <h1 className=" font-bold">Shipping Address</h1>
                      </div>
                      <div className=" relative right-0">
                        <h1>{item?.address}</h1>
                      </div>
                    </div>

                    <div className="flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold">Shipping Status </h1>
                      </div>
                      <div
                        className={`${
                          item?.shippingStatus === "Pending"
                            ? "text-gray-400"
                            : "text-primary"
                        } `}
                      >
                        <h1>{item?.shippingStatus}</h1>
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
                        } `}
                      >
                        <h1>{item?.paymentStatus}</h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <div>
                        <h1 className=" font-bold">Total Quentity</h1>
                      </div>

                      <div className=" relative right-0">
                        <h1>{item?.quantity}</h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className=" font-bold py-2">Total Price </h1>
                      </div>
                      <div className=" relative right-0">
                        <h1>
                          <b> ৳ </b>
                          {item?.totalPrice}
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-4 ">
                      <div>
                        <h1 className=" font-bold py-2">Product Details </h1>
                      </div>
                      <i
                        onClick={() => openDetailsModal(item, "")}
                        className="text-primary text-3xl  fa-solid fa-circle-info hover:text-[#57e0b3] "
                      ></i>
                    </div>
                    <dialog id="my_modal_5" className="modal  sm:modal-middle">
                      <div className="modal-box">
                        <div>
                          <h3 className="text-xl">Medicine Details :</h3>
                          <p>ID: {mediatorOrder?._id}</p>
                          <table className=" card-bordered border-[1px] px-2 border-primary  bg-secondary">
                            <thead className="card-bordered  border-[1px] px-2 border-primary">
                              <tr className=" card-bordered border-[1px] px-2 border-primary">
                                <th className="t-head card-bordered border-[1px] px-2 border-primary">
                                  Field
                                </th>
                                <th className="t-head">Value</th>
                              </tr>
                            </thead>
                            {mediatorOrder?.products?.map(
                              (state, i) => (
                                console.log(state),
                                (
                                  <tbody key={state._id}>
                                    <tr>
                                      <td className="card-bordered border-[1px] px-1 border-primary">
                                        {i + 1}. Name
                                      </td>
                                      <td className="card-bordered border-[1px] px-2 border-primary flex gap-1 justify-start items-center">
                                        <img
                                          className="h-16 w-16 rounded-full"
                                          src={`${
                                            import.meta.env.VITE_APP_BASE_URL
                                          }/products/${state?.product?.image}`}
                                          alt={state?.medicine?.img}
                                        />
                                        {state?.product?.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="card-bordered border-[1px] px-5 border-primary">
                                        category
                                      </td>
                                      <td className="card-bordered border-[1px] px-2 border-primary">
                                        {state?.product?.categoryFlag}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="card-bordered border-[1px]  px-5 border-primary">
                                        Discount Price
                                      </td>
                                      <td className="card-bordered border-[1px] px-2 border-primary">
                                        <b> ৳ </b>{" "}
                                        {state?.product?.discountPrice}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="card-bordered border-[1px]  px-5 border-primary">
                                        Quantity
                                      </td>
                                      <td className="card-bordered border-[1px] px-2 border-primary">
                                        {state?.quantity}
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              )
                            )}
                            <tr className=" card-bordered border-[1px] px-2 border-primary">
                              <th className="t-head text-start card-bordered border-[1px]  border-primary">
                                Total Price
                              </th>
                              <th className="t-head text-start px-1">
                                {" "}
                                <b>৳</b> {mediatorOrder?.totalPrice}(include
                                delivery Charge <span></span>
                                <b>৳</b> {mediatorOrder?.deliveryCharge})
                              </th>
                            </tr>
                          </table>
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle bg-primary absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <div className="flex justify-between items-center ">
                      <div>
                        <h1 className=" font-bold py-2">Action </h1>
                      </div>
                      <ReviewModal />
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* DestopView///////////////////////// */}
      {/* DestopView///////////////////////// */}
      {mediatorsOrder.length > 0 && (
        <div className="hidden lg:grid grid-cols-12 card-bordered rounded px-2 py-3 font-bold ">
          <div className=" col-span-3">
            <h1>Oerder ID</h1>
          </div>

          <div className=" col-span-2 ms-[-40px]">
            <h1>Shipping Address</h1>
          </div>
          <div className=" col-span-1">
            <h1>Shipping Status</h1>
          </div>
          <div className=" col-span-1">
            <h1>Payment Status</h1>
          </div>
          <div className=" col-span-1">
            <h1>Total Quentity</h1>
          </div>

          <div className=" col-span-1">
            <h1>Total Prize</h1>
          </div>
          <div className=" ms-10 col-span-2">
            <h1>Product Details</h1>
          </div>
          <div className=" col-span-1">
            <h1>Action</h1>
          </div>
        </div>
      )}

      {/* list items................... */}
      <div className="hidden lg:block">
        {isLoading ? (
          <OrderLoading />
        ) : (
          <>
            {mediatorsOrder.length === 0 ? (
              <NotFound content={"Sorry, You did't Order any Product."} />
            ) : (
              <>
                {mediatorsOrder?.map((item) => (
                  <div
                    key={item?._id}
                    className="hidden lg:grid items-center grid-cols-12 card-bordered rounded px-2 my-3 py-3 font-semibold  "
                  >
                    <div className=" col-span-3 ">
                      <p>{item?._id}</p>
                    </div>

                    <div className=" col-span-2 ms-[-40px]">
                      <h1>{item?.address}</h1>
                    </div>
                    <div
                      className={`${
                        item?.shippingStatus === "Pending"
                          ? "text-gray-400"
                          : "text-primary"
                      } col-span-1`}
                    >
                      <h1>{item?.shippingStatus}</h1>
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
                      <h1>{item?.quantity}</h1>
                    </div>

                    <div className=" col-span-1">
                      <h1>
                        <b>৳</b> {item?.totalPrice}
                      </h1>
                    </div>
                    <div className="col-span-2 cursor-pointer  rounded-full text-center ">
                      <i
                        onClick={() => openDetailsModal(item, "lg")}
                        className="text-primary text-3xl  fa-solid fa-circle-info hover:text-[#57e0b3] "
                      ></i>
                    </div>
                    {item?.paymentStatus === "Paid" &&
                    item?.shippingStatus === "Shipped" &&
                    item?.isReviewed === false ? (
                      <div className=" col-span-1">
                        <button
                          className="p-2 hover:text-black text-[15px] flex justify-center cursor-pointer    text-white  bg-primary rounded-full hover:bg-[#57e0b3]"
                          onClick={() =>
                            document
                              .getElementById(`my_modal_${item._id}`)
                              .showModal()
                          }
                        >
                          <i className="fa-regular fa-star"></i>
                        </button>
                      </div>
                    ) : (
                      item?.isReviewed === true && <p>Reviewed</p>
                    )}
                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog
                      id="my_modal_1"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <div>
                          <h3 className="text-xl">Medicine Details :</h3>
                          <p>ID: {mediatorOrder?._id}</p>
                          <table className=" card-bordered border-[1px] px-2 border-primary">
                            <thead className="card-bordered  border-[1px] px-2 border-primary">
                              <tr className=" card-bordered border-[1px] px-2 border-primary">
                                <th className="t-head card-bordered border-[1px] px-2 border-primary">
                                  Field
                                </th>
                                <th className="t-head">Value</th>
                              </tr>
                            </thead>
                            {mediatorOrder?.products?.map(
                              (state, i) => (
                                console.log(item?._id),
                                (
                                  <tbody key={state._id}>
                                    <tr>
                                      <td className="card-bordered border-[1px] px-1 border-primary">
                                        {i + 1}. Name
                                      </td>
                                      <td className="card-bordered border-[1px] px-2 border-primary flex gap-1 justify-start items-center">
                                        <img
                                          className="h-16 w-16 rounded-full"
                                          src={`${
                                            import.meta.env.VITE_APP_BASE_URL
                                          }/products/${state?.product?.image}`}
                                          alt={state?.medicine?.image}
                                        />
                                        {state?.product?.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="card-bordered border-[1px] px-5 border-primary">
                                        category
                                      </td>
                                      <td className="card-bordered border-[1px] px-2 border-primary">
                                        {state?.product?.categoryFlag}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="card-bordered border-[1px]  px-5 border-primary">
                                        Discount Price
                                      </td>
                                      <td className="card-bordered border-[1px] px-2 border-primary">
                                        <b> ৳ </b>{" "}
                                        {state?.product?.discountPrice}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="card-bordered border-[1px]  px-5 border-primary">
                                        Quantity
                                      </td>
                                      <td className="card-bordered border-[1px] px-2 border-primary">
                                        {state?.quantity}
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              )
                            )}
                            <tr className=" card-bordered border-[1px] px-2 border-primary">
                              <th className="t-head text-start card-bordered border-[1px]  border-primary">
                                Total Price
                              </th>
                              <th className="t-head text-start px-1">
                                {" "}
                                <b>৳</b> {mediatorOrder?.totalPrice}(include
                                delivery Charge <span></span>
                                <b>৳</b> {mediatorOrder?.deliveryCharge})
                              </th>
                            </tr>
                          </table>
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle bg-primary absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <dialog id={`my_modal_${item._id}`} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle bg-primary absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <ReviewForm orderId={item._id} item="mediator" />
                      </div>
                    </dialog>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* list items................... */}
    </div>
  );
};

export default LocalMediator;
