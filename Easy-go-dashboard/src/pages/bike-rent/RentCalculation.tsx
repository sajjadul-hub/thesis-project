import React, { useEffect, useState } from "react";
import "./RentCalculation.scss";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCalculation,
  getCalculation,
} from "../../features/calculation/calculationAPI";
import { RootState } from "../../app/store";
import Loader from "../../components/loading/loader";
import Swal from "sweetalert2";

type CalculationType = {
  _id: string;
  pricePerHour?: number;
  fuelPricePerLitre?: number;
  riderPricePerHour?: number;
  locations?: string[];
  bikeType?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const RentCalculation = () => {
  const { calculation, isLoading } = useSelector(
    (state: RootState) => state.calculation
  );
  const prevData = calculation[0] as CalculationType;

  const [data, setData] = useState({
    pricePerHour: prevData?.pricePerHour || undefined,
    fuelPricePerLitre: prevData?.fuelPricePerLitre || undefined,
    riderPricePerHour: prevData?.riderPricePerHour || undefined,
  });

  const [destinations, setDestinations] = useState<string[]>(
    prevData?.locations || []
  );

  const [bikeTypes, setBikeTypes] = useState<string[]>(
    prevData?.bikeType || []
  );

  useEffect(() => {
    getCalculation(dispatch);
  }, []);

  // prefill
  useEffect(() => {
    if (prevData) {
      setDestinations(prevData?.locations || []);
      setBikeTypes(prevData?.bikeType || []);
      setData({
        pricePerHour: prevData?.pricePerHour || undefined,
        fuelPricePerLitre: prevData?.fuelPricePerLitre || undefined,
        riderPricePerHour: prevData?.riderPricePerHour || undefined,
      });
    }
  }, [prevData]);

  const dispatch = useDispatch();

  const handleChange = (newTags: string[]) => {
    setDestinations(newTags);
  };

  const handleChangeBikeType = (newTags: string[]) => {
    setBikeTypes(newTags);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (data) {
        const calculatedData = {
          ...data,
          locations: destinations,
          bikeType: bikeTypes,
        };
        await addCalculation(dispatch, calculatedData);
        Swal.fire("Added!", "Calculation has been updated.", "success");
      }
    } catch (error) {
      Swal.fire(`Error", "Failed to add. ${error}`, "error");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="blog-form">
      <h1>Bike Rent Calculation</h1>
      <form onSubmit={handleSubmit}>
        <div className="blog-form-wrapper">
          <div className="item">
            <label>Price Per Hour</label>
            <input
              type="number"
              name="pricePerHour"
              placeholder="Price per hour"
              defaultValue={prevData?.pricePerHour}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Fuel Price (per litre)</label>
            <input
              type="number"
              name="fuelPricePerLitre"
              placeholder="Fuel price (per litre)"
              defaultValue={prevData?.fuelPricePerLitre}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Rider Price (per hour)</label>
            <input
              type="number"
              name="riderPricePerHour"
              placeholder="Rider price (per hour)"
              defaultValue={prevData?.riderPricePerHour}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="item">
              <label>Destinations</label>
              <TagsInput
                className="tagInput"
                value={destinations}
                onChange={handleChange}
                inputProps={{ placeholder: "Add your destination" }}
              />
            </div>
            <div className="item">
              <label>Bike Types</label>
              <TagsInput
                className="tagInput"
                value={bikeTypes}
                onChange={handleChangeBikeType}
                inputProps={{ placeholder: "Add your bike types" }}
              />
            </div>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default RentCalculation;
