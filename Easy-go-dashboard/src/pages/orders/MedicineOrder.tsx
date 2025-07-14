import { useDispatch } from "react-redux";
import { updateMedicine } from "../../features/medicines/medicineAPI";
import Swal from "sweetalert2";
import {
  getMedicineOrderList,
  updateMedicineOrder,
} from "../../features/orders/serviceApi";

type Props = {
  slug: string;
  item?: any;
  service?: string;
};

const MedicineOrder = (props: Props) => {
  const { slug, item, service } = props;
  const dispatch = useDispatch();
  const customerrDetails = {
    "Customer Name": item?.user?.name,
    "Customer email": item?.user?.email,
    "Primary Number": item?.phoneNumber,
    "Customer Address": item?.address,
  };

  const same = item?.medicines.map((one: any) => one?.quantity);
  const sum = same.reduce((acc: any, current: any) => acc + current, 0);
  console.log(same);

  const handlePaymentUpdate = async (id: string, status: string) => {
    try {
      const item = {
        paymentStatus: status,
      };

      if (item) {
        await updateMedicineOrder(dispatch, id, item);
        Swal.fire("Updated!", "Payment has been Updated.", "success");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleShippingUpdate = async (id: string, status: string) => {
    try {
      const item = {
        shippingStatus: status,
      };

      if (item) {
        await updateMedicineOrder(dispatch, id, item);
        Swal.fire("Updated!", "Payment has been Updated.", "success");
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
          <h3>Customer Details</h3>
          <table>
            <thead>
              <tr>
                <th className="t-head">Field</th>
                <th className="t-head">Value</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(customerrDetails).map(([field, value]) => (
                <tr key={field}>
                  <td>{field}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Medicine Details</h3>
          <table>
            <thead>
              <tr>
                <th className="t-head">Field</th>
                <th className="t-head">Value</th>
              </tr>
            </thead>
            {item?.medicines.map((state: any, i: number) => (
              <tbody key={state._id}>
                <tr>
                  <td>{i + 1}. Medicine Name</td>
                  <td>{state?.medicine?.name}</td>
                </tr>
                <tr>
                  <td>Medicine power</td>
                  <td>{state?.medicine?.power}</td>
                </tr>
                <tr>
                  <td>Medicine Quantity</td>
                  <td>{state?.quantity}</td>
                </tr>
              </tbody>
            ))}
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
                <td>Medicne Quantity</td>
                <td>{sum}</td>
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
                <td>{item?.shippingStatus}</td>
                <td className="status-td">
                  {item?.shippingStatus === "Pending" ? (
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
                <td>৳ {item?.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicineOrder;
