/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  updateProductQuantity,
} from "../../features/MedicineCart/cartSlice";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import { updateMediatorQuantity } from "../../features/mediatorCart/mediatorCart";

const Cart = ({ position }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const checkout = location.pathname.split("/").includes("checkout");
  const { mediatorCart, total } = useSelector((state) => state?.mediatorCart);
  const { products, medicineTotal } = useSelector((state) => state?.cart);
  const productTotal = total + medicineTotal;
  const { handleClearCart, handleRemoveFromCart } = useContext(AuthContext);
  const [cart, setCart] = useState(false);

  const cartDropdown = () => {
    setCart(!cart);
  };

  const totalPrice = Number(productTotal);

  const closeCartDropdown = () => {
    setCart(false);
  };
  const handleQuantity = (type, productId, cartType) => {
    const updatedQuantity = type === "inc" ? 1 : -1;
    if (cartType === "medicine") {
      dispatch(updateProductQuantity({ productId, quantity: updatedQuantity }));
    } else {
      dispatch(
        updateMediatorQuantity({ productId, quantity: updatedQuantity })
      );
    }
  };

  return (
    <div>
      <div className={`dropdown dropdown-${position}`}>
        <label
          tabIndex={0}
          onClick={cartDropdown}
          title="Cart"
          className="w-9 h-9 flex justify-center items-center text-primary  cursor-pointer"
        >
          <i className="fa-solid fa-cart-plus text-2xl "></i>
        </label>

        {cart && (
          <ul
            tabIndex={0}
            className="duration-700 py-6 dropdown-content z-[100] lg:h-[100vh] shadow  lg:mt-[-58px]  lg:w-[36vw] w-[105vw] bg-white mb-[-45px]  lg:bg-secondary lg:mr-[-108px] ml-[-235px] lg:ml-auto lg:px-5 px-10 h-[100vh] pt-16 lg:pt-3"
          >
            <div className="lg:py-auto pt-4 ">
              <div className="flex justify-between items-center text-primary pb-4 border-b-[2px] ">
                <h1 className="text-xl font-bold">
                  <i
                    onClick={closeCartDropdown}
                    className="lg:hidden fa-solid fa-arrow-left me-5"
                  ></i>
                  {mediatorCart.length > 0 || products.length > 0
                    ? mediatorCart.length + products.length
                    : ""}{" "}
                  Item
                </h1>
                <div className="flex justify-center gap-9 items-end">
                  {checkout ? (
                    ""
                  ) : (
                    <>
                      {mediatorCart.length > 0 || products.length > 0 ? (
                        <>
                          <div
                            onClick={() => handleClearCart()}
                            className="flex justify-center gap-3 items-center cursor-pointer text-primary text-lg hover:text-black"
                          >
                            <i className="fa-solid fa-trash"></i>
                            <h1 className="">Clear all</h1>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                  <i
                    onClick={closeCartDropdown}
                    className=" cursor-pointer lg:block hidden hover:text-black fa-solid fa-xmark text-[20px] text-red-400"
                  ></i>
                </div>
              </div>
              <div className="h-[65vh] overflow-y-auto scroll-smooth ">
                {!totalPrice ? (
                  <div className="flex justify-center pt-40">
                    <div>
                      <i className=" fa-solid fa-face-sad-tear text-primary text-[150px]"></i>
                      <p className="text-center pt-3 text-lg font-semibold">
                        item not added yet
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <>
                  {mediatorCart.length > 0 ? (
                    <div>
                      <p className="text-md font-semibold">
                        Mediator Item: {mediatorCart.length}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {mediatorCart.map((item, i) => (
                    <div key={item?._id} className=" grid grid-cols-12 mt-5 ">
                      <div className=" col-span-3">
                        <div className="relative flex-1 m-12 md:m-5 min-w-280 h-350 flex items-center justify-center bg-f5fbfd transition-opacity duration-500 ease-in cursor-pointer group">
                          <div
                            className={`${
                              checkout ? "hidden" : ""
                            } absolute inset-0 bg-rgba-0-0-0-0-2 opacity-0 flex items-center justify-center z-30 group-hover:opacity-100`}
                          >
                            <div
                              style={{
                                transition: "all 0.5s ease",
                                cursor: "pointer",
                              }}
                              className="bg-[#e6dfdfb9] lg:w-[76px]  lg:h-[76px] rounded-xl absolute "
                            >
                              <i
                                onClick={() =>
                                  handleRemoveFromCart(item?._id, "")
                                }
                                className="fa-solid fa-xmark text-[20px] bg-white opacity-100  h-6 w-6 rounded-full text-red-600 z-[100] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center"
                              ></i>
                            </div>
                          </div>
                          <div className="relative  flex rounded-xl overflow-hidden shrink-0 cursor-pointer lg:w-[76px] w-[50px] h-[50px]  lg:h-[76px] mt-[-20px] ms-[-30px] lg:m-auto">
                            {item?.image && (
                              <img
                                src={`${
                                  import.meta.env.VITE_APP_BASE_URL
                                }/products/${item.image}`}
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className=" col-span-6 pe-5">
                        <h1 className="text-md font-semibold">{item?.name}</h1>
                        <p className=" text-sm text-primary mt-1 font-semibold mb-2">
                          {item?.group}
                        </p>
                        <div className="lg:flex justify-center items-center gap-3 text-center ">
                          <div className="mb-2 lg:mb-auto lg:w-full w-[70%] p-1 bg-secondary rounded-md border-[1px] border-primary text-sm">
                            <p>
                              {item?.strip ? item?.strip : 10 * item?.quantity}
                            </p>
                          </div>

                          <div className="lg:w-full w-[70%] flex justify-center items-center gap-5 bg-secondary rounded-md p-1  border-[1px] border-primary">
                            <button
                              onClick={() =>
                                item?.quantity > 1
                                  ? handleQuantity("dec", item?._id, "")
                                  : console.log("can zero")
                              }
                              className="text-sm"
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <p className="text-sm">{item?.quantity}</p>
                            <button
                              onClick={() =>
                                handleQuantity("inc", item?._id, "")
                              }
                              className="text-sm"
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="lg:m-auto col-span-3">
                        <p className="inline text-lg font-bold">
                          <b>৳</b>
                          {parseFloat(
                            item?.discountPrice * item?.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
                {products.length > 0 ? (
                  <div>
                    <p className="text-md font-semibold">
                      Medicine Item: {products.length}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {products.map((item, i) => (
                  <div key={item?._id} className=" grid grid-cols-12 mt-5 ">
                    <div className=" col-span-3">
                      <div className="relative flex-1 m-12 md:m-5 min-w-280 h-350 flex items-center justify-center bg-f5fbfd transition-opacity duration-500 ease-in cursor-pointer group">
                        <div
                          className={`${
                            checkout ? "hidden" : ""
                          } absolute inset-0 bg-rgba-0-0-0-0-2 opacity-0 flex items-center justify-center z-30 group-hover:opacity-100`}
                        >
                          <div
                            style={{
                              transition: "all 0.5s ease",
                              cursor: "pointer",
                            }}
                            className="bg-[#e6dfdfb9] lg:w-[76px]  lg:h-[76px] rounded-xl absolute "
                          >
                            <i
                              onClick={() =>
                                handleRemoveFromCart(item?._id, "medicine")
                              }
                              className="fa-solid fa-xmark text-[20px] bg-white opacity-100  h-6 w-6 rounded-full text-red-600 z-[100] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center"
                            ></i>
                          </div>
                        </div>
                        <div className="relative  flex rounded-xl overflow-hidden shrink-0 cursor-pointer lg:w-[76px] w-[50px] h-[50px]  lg:h-[76px] mt-[-20px] ms-[-30px] lg:m-auto">
                          {item?.img && (
                            <img
                              className="relative "
                              src={`${
                                import.meta.env.VITE_APP_BASE_URL
                              }/medicines/${item.img}`}
                              alt={item?.img}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=" col-span-6 pe-5">
                      <h1 className="text-md font-semibold">{item?.name}</h1>
                      <p className=" text-sm text-primary mt-1 font-semibold mb-2">
                        {item?.group}
                      </p>
                      <div className="lg:flex justify-center items-center gap-3 text-center ">
                        <div className="mb-2 lg:mb-auto lg:w-full w-[70%] p-1 bg-secondary rounded-md border-[1px] border-primary text-sm">
                          <p>
                            {item?.strip ? item?.strip : 10 * item?.quantity}
                          </p>
                        </div>

                        <div className="lg:w-full w-[70%] flex justify-center items-center gap-5 bg-secondary rounded-md p-1  border-[1px] border-primary">
                          <button
                            onClick={() =>
                              item?.quantity > 1
                                ? handleQuantity("dec", item?._id, "medicine")
                                : console.log("can zero")
                            }
                            className="text-sm"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <p className="text-sm">{item?.quantity}</p>
                          <button
                            onClick={() =>
                              handleQuantity("inc", item?._id, "medicine")
                            }
                            className="text-sm"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="lg:m-auto col-span-3">
                      <p className="inline text-lg font-bold">
                        <b>৳</b>
                        {parseFloat(
                          item?.discountPrice * item?.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {totalPrice ? (
                <div className="flex flex-col  border-t-[2px]">
                  <div className="flex justify-between pt-3 px-4">
                    <div>
                      <h1 className="text-brand-dark  lg:text-[18px] lg:leading-7 font-medium mb-1.5 text-lg text-brand-dark ">
                        Subtotal:
                      </h1>
                    </div>
                    <div className="text-lg font-semibold">
                      <b>৳</b> {totalPrice}
                    </div>
                  </div>

                  <div className={`${checkout ? "hidden" : ""}`}>
                    <Link
                      to="/checkout"
                      className="w-[85vw] uppercase text-[15px] bg-[#3CBD96] hover:text-black hover:font-bold text-white font-semibold lg:w-[32vw] h-[8vh] rounded-lg lg:py-2 px-5 mt-4 mx-auto text-center flex justify-center items-center"
                    >
                      Proceed To Checkout
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
