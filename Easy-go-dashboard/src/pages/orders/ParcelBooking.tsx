import { useDispatch } from "react-redux";
import { updateParcelBooking } from "../../features/orders/serviceApi";
import "./BikeBooking";
import Swal from "sweetalert2";

type Props = {
  slug: string;
  item?: any;
  service?: string;
};

const ParcelBooking = (props: Props) => {
  const { slug, item, service } = props;
  const dispatch = useDispatch();
  const senderDetails = {
    "Sender Name": item?.sender_name,
    "Sender Address": item?.sender_address,
    "Primary Number": item?.primary_num,
    "Secondary Number": item?.secondary_num,
  };
  const receiverDetails = {
    "Receiver Name": item?.receiver_name,
    "Receiver Address": item?.receiver_address,
    "Receiver Number": item?.receiver_phone,
  };

  const handlePaymentUpdate = async (id: string, status: string) => {
    try {
      const item = {
        paymentStatus: status,
      };

      if (item) {
        await updateParcelBooking(dispatch, id, item);
        Swal.fire("Updated!", "Payment has been Updated.", "success");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleShippingUpdate = async (id: string, status: string) => {
    try {
      const item = {
        parcelStatus: status,
      };

      if (item) {
        await updateParcelBooking(dispatch, id, item);
        Swal.fire("Updated!", "parcel status has been Updated.", "success");
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
          <h3>Sender Details</h3>
          <table>
            <thead>
              <tr>
                <th className="t-head">Field</th>
                <th className="t-head">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(senderDetails).map(([field, value]) => (
                <tr key={field}>
                  <td>{field}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Receiver Details</h3>
          <table>
            <thead>
              <tr>
                <th className="t-head">Field</th>
                <th className="t-head">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(receiverDetails).map(([field, value]) => (
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
                <td>Product Type</td>
                <td>{item?.p_type}</td>
              </tr>
              <tr>
                <td>Product Weight</td>
                <td>{item?.p_weight}</td>
              </tr>
              <tr>
                <td>Payment Status</td>
                <td>{item?.paymentStatus}</td>
                <td className="status-td">
                  {item?.paymentStatus === "Pending" ? (
                    <button
                      title="Update Payment"
                      className="payment"
                      onClick={() => handlePaymentUpdate(item?._id, "Paid")}
                    >
                      <img src="/payment.png" alt="" />
                    </button>
                  ) : (
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
                  )}
                </td>
              </tr>
              <tr>
                <td>Delivery Status</td>
                <td>{item?.parcelStatus}</td>
                <td className="status-td">
                  {item?.parcelStatus === "Pending" ? (
                    <button
                      title="Update Shipping"
                      className="shipping"
                      onClick={() => handleShippingUpdate(item?._id, "Shipped")}
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

export default ParcelBooking;
