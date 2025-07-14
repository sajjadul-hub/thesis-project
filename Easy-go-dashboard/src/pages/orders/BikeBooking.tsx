import moment from "moment";
import "./BikeBooking.scss";
import {
  getBikeBookingList,
  updateBikeBooking,
} from "../../features/orders/serviceApi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

type Props = {
  slug: string;
  item?: any;
  service?: string;
};

const BikeBooking = (props: Props) => {
  const { slug, service, item } = props;
  const dispatch = useDispatch();
  if (!item) return null;
  const personalDetails = {
    Name: item?.name,
    Gender: item?.gender,
    "Phone Number": item?.phoneNumber,
    NID: item?.nid,
    "Driving License": item?.drivingLicense,
  };
  const startDate = moment(item.start_date);
  const endDate = moment(item.end_date);
  const startTime = moment(item.start_time, "HH:mm");
  const endTime = moment(item.end_time, "HH:mm");
  const formattedStartDate = startDate.format("MMM Do YY");
  const formattedEndDate = endDate.format("MMM Do YY");
  const formattedStartTime = startTime.format("ha");
  const formattedEndTime = endTime.format("ha");

  const travelDetails = {
    Start: item.from,
    End: item.destination,
    "Fuel(In Litter)": item.fuel,
    Date: `${formattedStartDate} - ${formattedEndDate}`,
    Time: `${formattedStartTime} - ${formattedEndTime}`,
    "Bike Type": item.bikeType,
    "Rider Gender": item.rider,
  };

  const handlePaymentUpdate = async (id: string, status: string) => {
    try {
      const item = {
        paymentStatus: status,
      };

      if (item) {
        await updateBikeBooking(dispatch, id, item);
        Swal.fire("Updated!", "Payment has been Updated.", "success");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleShippingUpdate = async (id: string, status: string) => {
    try {
      const item = {
        rentStatus: status,
      };

      if (item) {
        await updateBikeBooking(dispatch, id, item);
        Swal.fire("Updated!", "Rent Status has been Updated.", "success");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="orderContainer">
      <div className="heading">
        <h2>{slug}</h2>
        <h2>{service}</h2>
      </div>
      <div className="orderForm">
        <div>
          <h3>Personal Details</h3>
          <table>
            <thead>
              <tr>
                <th className="t-head">Field</th>
                <th className="t-head">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(personalDetails).map(([field, value]) => (
                <tr key={field}>
                  <td>{field}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Travel Details</h3>
          <table>
            <thead>
              <tr>
                <th className="t-head">Field</th>
                <th className="t-head">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(travelDetails).map(([field, value]) => (
                <tr key={field}>
                  <td>{field}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Payment Details</h3>
          <table>
            <thead>
              <tr>
                <th className="t-head">Field</th>
                <th className="t-head">Status</th>
                <th className="t-head">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Payment Status</td>
                <td>{item?.paymentStatus}</td>
                <td className="status-td">
                  {item?.paymentStatus === "Paid" ? (
                    <button
                      className="status-btn"
                      onClick={() => handlePaymentUpdate(item?._id, "Pending")}
                    >
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src="check.png"
                        alt=""
                      />
                    </button>
                  ) : (
                    <button
                      title="Update Payment"
                      className="payment"
                      onClick={() => handlePaymentUpdate(item?._id, "Paid")}
                    >
                      <img src="/payment.png" alt="" />
                    </button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Rent Status</td>
                <td>{item?.rentStatus}</td>
                <td className="status-td">
                  {item?.rentStatus === "Pending" ? (
                    <button
                      title="Update Shipping"
                      className="shipping"
                      onClick={() => handleShippingUpdate(item?._id, "Over")}
                    >
                      <img src="/shipping.png" alt="" />
                    </button>
                  ) : (
                    <button
                      className="status-btn"
                      onClick={() => handleShippingUpdate(item?._id, "Pending")}
                    >
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src="check.png"
                        alt=""
                      />
                    </button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>৳ {item?.total_amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BikeBooking;
