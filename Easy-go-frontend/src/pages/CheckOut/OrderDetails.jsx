/* eslint-disable react/prop-types */
import OderFrom from "../../components/Form/OderFrom";

const OrderDetails = ({ handleNext }) => {
  return (
    <div>
      <OderFrom handleNext={handleNext} />
    </div>
  );
};

export default OrderDetails;
