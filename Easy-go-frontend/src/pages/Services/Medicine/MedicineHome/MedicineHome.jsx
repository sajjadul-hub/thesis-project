import { useEffect } from "react";
import MedicineBanner from "../MedicineBanner";
import Medicine_Cat from "../Medicine_Cat/Medicine_Cat";
import QuickService from "../QuickService/QuickService";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines } from "../../../../features/medicine/serviceApi";
import Swal from "sweetalert2";
import MedicineCard from "../components/MedicineCard/MedicineCard";
import OrderDirective from "../components/OrderDirective/OrderDirective";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "./Loader";

function MedicineHome() {
  const { medicines, isLoading, error } = useSelector(
    (state) => state.medicine
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getMedicines(dispatch);
  }, [dispatch]);

  const otcData =
    !isLoading &&
    medicines &&
    medicines?.data?.length > 0 &&
    medicines?.data?.filter((m) => m.cat === "otc");

  const womenData =
    !isLoading &&
    medicines &&
    medicines?.data?.length > 0 &&
    medicines?.data?.filter((m) => m.cat === "women");
  const sexualData =
    !isLoading &&
    medicines &&
    medicines?.data?.length > 0 &&
    medicines?.data?.filter((m) => m.cat === "sexual");
  const diabeticData =
    !isLoading &&
    medicines &&
    medicines?.data?.length > 0 &&
    medicines?.data?.filter((m) => m.cat === "diabetic");
  const babyData =
    !isLoading &&
    medicines &&
    medicines?.data?.length > 0 &&
    medicines?.data?.filter((m) => m.cat === "baby");
  const dentalData =
    !isLoading &&
    medicines &&
    medicines?.data?.length > 0 &&
    medicines?.data?.filter((m) => m.cat === "dental");
  const personalData =
    !isLoading &&
    medicines &&
    medicines?.data?.length > 0 &&
    medicines?.data?.filter((m) => m.cat === "personal");
  const perceptionData =
    !isLoading &&
    medicines &&
    medicines?.data?.length > 0 &&
    medicines?.data?.filter((m) => m.cat === "prescription");

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oho",
        text: error,
        confirmButtonColor: "#3CBD96 ",
      });
    }
  }, [error]);

  return (
    <div>
      <MedicineBanner />
      <div className="my-5"></div>
      <Medicine_Cat />
      <div className="my-5"></div>
      <QuickService />
      <div className="my-5"></div>
      <OrderDirective />
      <div className="my-5"></div>
      {isLoading
        ? [1, 2, 3].map((item) => <Loader key={item} />)
        : medicines &&
          medicines?.data?.length > 0 && (
            <div>
              <MedicineCard medicines={otcData} category={"OTC Medicine"} />
              <div className="my-5"></div>
              <MedicineCard medicines={womenData} category={"Women Choice"} />
              <div className="my-5"></div>
              <MedicineCard
                medicines={sexualData}
                category={"Sexual Wellness"}
              />
              <div className="my-5"></div>
              <MedicineCard
                medicines={diabeticData}
                category={"DiabetiC Care"}
              />
              <div className="my-5"></div>
              <MedicineCard medicines={babyData} category={"Baby Care"} />
              <div className="my-5"></div>
              <MedicineCard medicines={dentalData} category={"Dental Care"} />
              <div className="my-5"></div>
              <MedicineCard
                medicines={personalData}
                category={"Personal Care"}
              />
              <div className="my-5"></div>
              <MedicineCard
                medicines={perceptionData}
                category={"Prescription"}
              />
            </div>
          )}
    </div>
  );
}
export default MedicineHome;
