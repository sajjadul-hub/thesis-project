import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getMedicine } from "../../../../../features/medicine/serviceApi";
import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { addToCart } from "../../../../../features/MedicineCart/cartSlice";
import { AuthContext } from "../../../../../Context/AuthProvider";

const SingleMedicine = () => {
  const { medicine } = useSelector((state) => state.medicine);
  const { handleSingleCart } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

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
      getMedicine(dispatch, id);
    }
  }, [id, dispatch]);

  return (
    <div className="mx-[30px] my-[75px]">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="pic md:w-[50%] w-full h-[350px] rounded-md">
          {medicine?.img ? (
            <img
              className="w-full h-[350px] object-cover rounded-md"
              src={`${import.meta.env.VITE_APP_BASE_URL}/medicines/${
                medicine?.img
              }`}
              alt={medicine?.img}
            />
          ) : (
            <div className="w-full h-[350px] object-cover rounded-md bg-secondary "></div>
          )}
        </div>
        <div className="description md:w-[50%] w-full h-[350px] flex flex-col justify-between">
          {medicine?.name &&
          medicine?.group &&
          medicine?.pharmacyName &&
          medicine?.basePrice ? (
            <>
              {" "}
              <h1 className="text-2xl font-semibold">{medicine?.name}</h1>
              <p className="text-custom">{medicine?.group}</p>
              <p className="text-primary">{medicine?.pharmacyName}</p>
              <span>
                <del className="inline">
                  MRP ৳ {parseFloat(medicine?.basePrice * quantity).toFixed(2)}
                </del>{" "}
                <p className="inline text-blue-500 font-semibold ml-3">
                  {medicine?.discount}% off
                </p>
              </span>
              <span className="inline">
                <p className="inline text-xl font-semibold">Best Price</p>{" "}
                <p className="inline text-2xl font-bold">
                  TK {parseFloat(medicine?.discountPrice * quantity).toFixed(2)}
                </p>
                <small className="inline text-custom text-[18px]"></small>
              </span>
            </>
          ) : (
            <div>
              <p className="p-16 w-full bg-secondary rounded-lg"></p>
            </div>
          )}
          <div className="w-full p-3 bg-secondary rounded-md">
            <p className="text-center font-bold">{medicine?.strip}</p>
          </div>
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
              handleSingleCart(medicine, quantity, "medicine", navigate)
            }
            className="bg-primary text-white font-semibold p-3 rounded-md text-center"
          >
            <button>Add To Cart</button>
          </div>
        </div>
      </div>
      <div className="disclaim my-6">
        <h1 className="text-2xl font-bold">About the {medicine?.name}</h1>
        <p className="text-custom mt-3">{medicine?.about}</p>
      </div>
      {medicine?.info && (
        <div className="disclaim my-6">
          <h1 className="text-2xl font-bold">More Info</h1>
          <p className="text-custom mt-3">{medicine?.info}</p>
        </div>
      )}
      <div className="disclaim my-6 bg-lime-50 p-2">
        <h1 className="text-2xl font-bold text-red-500">Disclaimer</h1>
        <p className="text-custom mt-3">
          The information provided is accurate to our best practices, but it
          does not replace professional medical advice. We cannot guarantee its
          completeness or accuracy. The absence of specific information about a
          drug should not be seen as an endorsement. We are not responsible for
          any consequences resulting from this information, so consult a
          healthcare professional for any concerns or questions.
        </p>
      </div>
    </div>
  );
};

export default SingleMedicine;
