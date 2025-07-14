/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { updateProductQuantity } from "../../features/MedicineCart/cartSlice";
import { updateMediatorQuantity } from "../../features/mediatorCart/mediatorCart";

const OrderList = ({ mediatorCart, products }) => {
  const dispatch = useDispatch();

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
      <h1 className="text-2xl font-bold ms-10  mt-10 mb-8">Shipping Cart</h1>
      {mediatorCart.length > 0 ? (
        <div>
          <p className="lg:text-md text-lg text-primary ms-[-18px] font-semibold lg:ms-10  ">
            Mediator Item: {mediatorCart.length}
          </p>
        </div>
      ) : (
        ""
      )}
      {mediatorCart.map((item, i) => (
        <div key={item?._id} className=" grid grid-cols-12 mt-0 ">
          <div className=" col-span-3">
            <div className="relative flex-1 m-12 md:m-5 min-w-280 h-350 flex items-center justify-center bg-f5fbfd transition-opacity duration-500 ease-in cursor-pointer group">
              <div className="absolute inset-0 bg-rgba-0-0-0-0-2 opacity-0 flex items-center justify-center z-30 group-hover:opacity-100"></div>
              <div className="relative  flex  overflow-hidden shrink-0 cursor-pointer lg:w-[100px] w-[100px] h-[70px]  lg:h-[76px] mt-[-17px]  ms-[-35px] lg:m-auto">
                {item?.image && (
                  <img
                    className="rounded w-[93px]"
                    src={`${import.meta.env.VITE_APP_BASE_URL}/products/${
                      item.image
                    }`}
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
                <p>{item?.strip ? item?.strip : 10 * item?.quantity}</p>
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
                  onClick={() => handleQuantity("inc", item?._id, "")}
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
              {parseFloat(item?.discountPrice * item?.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      {products.length > 0 ? (
        <div>
          <p className="lg:text-md text-lg text-primary ms-[-18px] font-semibold lg:ms-10  ">
            Medicine Item: {products.length}
          </p>
        </div>
      ) : (
        ""
      )}
      {products.map((item, i) => (
        <div key={item?._id} className=" grid grid-cols-12 mt-4 ">
          <div className=" col-span-3">
            <div className="relative flex-1 m-12 md:m-5 min-w-280 h-350 flex items-center justify-center bg-f5fbfd transition-opacity duration-500 ease-in cursor-pointer group">
              <div className="absolute inset-0 bg-rgba-0-0-0-0-2 opacity-0 flex items-center justify-center z-30 group-hover:opacity-100"></div>
              <div className="relative  flex rounded-xl overflow-hidden shrink-0 cursor-pointer lg:w-[100px] w-[100px] h-[50px]  lg:h-[76px] mt-[-20px] ms-[-30px] lg:m-auto">
                {item?.img && (
                  <img
                    className="relative "
                    src={`${import.meta.env.VITE_APP_BASE_URL}/medicines/${
                      item.img
                    }`}
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
                <p>{item?.strip ? item?.strip : 10 * item?.quantity}</p>
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
                  onClick={() => handleQuantity("inc", item?._id, "medicine")}
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
              {parseFloat(item?.discountPrice * item?.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
