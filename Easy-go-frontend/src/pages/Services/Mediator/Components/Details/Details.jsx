/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMediator } from "../../../../../features/mediator/serviceApi";
import Loader from "./Loader";

const Details = () => {
  const { mediator, isLoading } = useSelector((state) => state.mediator);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { handleSingleCart } = useContext(AuthContext);

  const handleQuantityInc = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityDic = () => {
    if (1 < quantity) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (id) {
      getMediator(dispatch, id);
    }
  }, [id, dispatch]);
  return (
    <div>
      {!mediator ? (
        <Loader />
      ) : (
        <div className="mx-[30px] my-[75px]">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="pic md:w-[50%] w-full h-[350px] rounded-md">
              {mediator?.image ? (
                <img
                  className="w-full h-[350px] object-cover rounded-md"
                  src={`${import.meta.env.VITE_APP_BASE_URL}/products/${
                    mediator?.image
                  }`}
                  alt={mediator?.image}
                />
              ) : (
                <div className="w-full h-[350px] object-cover rounded-md bg-secondary"></div>
              )}
            </div>
            <div className="description md:w-[50%] w-full h-[350px] flex flex-col justify-between">
              <h1 className="text-2xl font-semibold">{mediator?.name}</h1>
              {/* <p className="text-custom">{mediator?.group}</p>
            <p className="text-primary">{mediator?.pharmacyName}</p> */}
              {mediator?.basePrice && mediator?.discountPrice ? (
                <>
                  {" "}
                  <span>
                    <del className="inline">
                      MRP ৳{" "}
                      {parseFloat(mediator?.basePrice * quantity).toFixed(2)}
                    </del>{" "}
                    <p className="inline text-blue-500 font-semibold ml-3">
                      {mediator?.discount}% off
                    </p>
                  </span>
                  <span className="inline">
                    <p className="inline text-xl font-semibold">Best Price</p>{" "}
                    <p className="inline text-2xl font-bold">
                      TK{" "}
                      {parseFloat(mediator?.discountPrice * quantity).toFixed(
                        2
                      )}
                    </p>
                    <small className="inline text-custom text-[18px]"></small>
                  </span>
                </>
              ) : (
                <div>
                  <p className="p-28 w-full bg-secondary"></p>
                </div>
              )}

              <div className="flex justify-center items-center gap-5 bg-secondary rounded-md p-3 w-full">
                <button onClick={handleQuantityDic} className="text-[18px]">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <p className="text-[18px]">{quantity}</p>
                <button onClick={handleQuantityInc} className="text-[18px]">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div
                onClick={() =>
                  handleSingleCart(mediator, quantity, "", navigate)
                }
                className="bg-primary text-white font-semibold p-3 rounded-md text-center"
              >
                <button>Add To Cart</button>
              </div>
            </div>
          </div>
          <div className="disclaim my-6">
            <h1 className="text-2xl font-bold">About the {mediator?.name}</h1>
            <p className="text-custom mt-3">{mediator?.description}</p>
          </div>
          {mediator?.info && (
            <div className="disclaim my-6">
              <h1 className="text-2xl font-bold">More Info</h1>
              <p className="text-custom mt-3">{mediator?.info}</p>
            </div>
          )}
          <div className="disclaim my-6 bg-lime-50 p-2">
            <h1 className="text-2xl font-bold text-red-500">Disclaimer</h1>
            <p className="text-custom mt-3">
              The information provided is accurate to our best practices, but it
              does not replace professional medical advice. We cannot guarantee
              its completeness or accuracy. The absence of specific information
              about a drug should not be seen as an endorsement. We are not
              responsible for any consequences resulting from this information,
              so consult a healthcare professional for any concerns or
              questions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
