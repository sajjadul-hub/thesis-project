/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Banner from "../../Home/Banner";
import { useEffect, useState } from "react";

import MediatorCategory from "./Components/Mediator_cat/Mediator_cat";
import OrderDirective from "../Medicine/components/OrderDirective/OrderDirective";
import MediatorCard from "./Components/MediatorCard/MediatorCard";
import { useDispatch, useSelector } from "react-redux";
import { getMediators } from "../../../features/mediator/serviceApi";
import Loader from "../Medicine/MedicineHome/Loader";
import Swal from "sweetalert2";

const Mediator = () => {
  const { mediators, isLoading, error } = useSelector(
    (state) => state.mediator
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getMediators(dispatch);
  }, [dispatch]);

  const localFoods =
    !isLoading &&
    mediators &&
    mediators?.data?.length > 0 &&
    mediators?.data?.filter((m) => m.categoryFlag === "Local Food");

  const traditionalClothes =
    !isLoading &&
    mediators &&
    mediators?.data?.length > 0 &&
    mediators?.data?.filter((m) => m.categoryFlag === "Traditional Clothes");
  const handicraft =
    !isLoading &&
    mediators &&
    mediators?.data?.length > 0 &&
    mediators?.data?.filter((m) => m.categoryFlag === "Handicraft");
  const vgetables =
    !isLoading &&
    mediators &&
    mediators?.data?.length > 0 &&
    mediators?.data?.filter((m) => m.categoryFlag === "Vegetable");
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
    <div className="overflow-hidden mb-5">
      <div className="">
        <Banner category={"mediator"} />
      </div>
      <div className="my-6">
        <MediatorCategory />
      </div>
      <div className="mt-6">
        <OrderDirective />
      </div>
      <div className="px-10 ">
        {isLoading
          ? [1, 2, 3].map((item) => <Loader key={item} />)
          : mediators?.data?.length > 0 && (
              <div>
                <div className="">
                  <MediatorCard mediator={localFoods} category={"Local Food"} />
                  <MediatorCard
                    mediator={traditionalClothes}
                    category={"Traditional Clothes"}
                  />
                  <MediatorCard mediator={handicraft} category={"Handicraft"} />
                  <MediatorCard mediator={vgetables} category={"Vegetable"} />
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default Mediator;
