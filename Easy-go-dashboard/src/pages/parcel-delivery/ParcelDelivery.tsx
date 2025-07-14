import React, { useEffect, useState } from "react";
import "./parcel-delivery.scss";
import "react-tagsinput/react-tagsinput.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addParcelCalculation,
  getParcelCalculation,
} from "../../features/calculation/calculationAPI";
import { RootState } from "../../app/store";
import Loader from "../../components/loading/loader";
import Swal from "sweetalert2";

type ParcelDeliveryType = {
  _id: string;
  productTypes?: object;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Pair = {
  key: string;
  value: number;
};

type HandleInputChange = (
  index: number,
  keyOrValue: keyof Pair,
  newValue: string
) => void;

const RentCalculation = () => {
  const { parcelCalculation, isLoading } = useSelector(
    (state: RootState) => state.calculation
  );
  const prevData = parcelCalculation[0] as ParcelDeliveryType;

  useEffect(() => {
    getParcelCalculation(dispatch);
  }, []);

  const dispatch = useDispatch();

  const initialState =
    prevData &&
    // @ts-ignore
    Object.entries(prevData?.productTypes)?.map(([key, value]) => ({
      key,
      value,
    }));

  const [pairs, setPairs] = useState(initialState);

  const transformedData =
    pairs &&
    pairs.reduce((result, { key, value }) => {
      // @ts-ignore
      result[key] = Number(value);
      return result;
    }, {});

  // prefill
  useEffect(() => {
    if (prevData) {
      setPairs(initialState);
    }
  }, [prevData]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (transformedData) {
        await addParcelCalculation(dispatch, {
          productTypes: transformedData,
        });
        Swal.fire("Added!", "Calculation has been updated.", "success");
      }
    } catch (error) {
      Swal.fire(`Error", "Failed to add. ${error}`, "error");
    }
  };

  const handleInputChange: HandleInputChange = (
    index,
    keyOrValue,
    newValue
  ) => {
    const newPairs = [...pairs];
    newPairs[index][keyOrValue] = newValue;
    setPairs(newPairs);
  };

  const addPair = () => {
    setPairs([...pairs, { key: "", value: "" }]);
  };

  const removePair = (index: any) => {
    const newPairs = [...pairs];
    newPairs.splice(index, 1);
    setPairs(newPairs);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="parcel-form">
      <h1>Bike Rent Calculation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {pairs &&
            pairs.map((pair, index) => (
              <div key={index} className="parcel-form-wrapper">
                <div className="item">
                  <input
                    type="text"
                    value={pair.key}
                    placeholder="Key"
                    onChange={(e) =>
                      handleInputChange(index, "key", e.target.value)
                    }
                  />
                </div>
                <div className="item">
                  <input
                    type="number"
                    // @ts-ignore
                    value={pair.value}
                    placeholder="Value"
                    onChange={(e) =>
                      handleInputChange(index, "value", e.target.value)
                    }
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "40px",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  onClick={() => removePair(index)}
                >
                  X
                </div>
              </div>
            ))}
          <div className="addBtn" onClick={addPair}>
            Add New Product Type
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default RentCalculation;
