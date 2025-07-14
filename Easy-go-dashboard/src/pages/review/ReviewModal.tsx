import { useDispatch } from "react-redux";
import {
  updateParcelBooking,
  updateReview,
} from "../../features/orders/serviceApi";
import "./ReviewModal.scss";
import Swal from "sweetalert2";

type Props = {
  slug: string;
  item?: any;
  service?: string;
};

const ReviewModal = (props: Props) => {
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

  const handleApprovalUpdate = async () => {
    try {
      const data = {
        isApproved: !item?.isApproved,
      };

      if (data) {
        await updateReview(dispatch, item?._id, data);
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
      </div>
      <div className="orderForm">
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
                <td>User</td>
                <td>
                  <p>{item?.user?.name}</p>
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    src={item?.user?.photoURL}
                  />
                </td>
              </tr>
              <tr>
                <td>Message</td>
                <td>{item?.message}</td>
              </tr>
              <tr>
                <td>Item</td>
                <td>{item?.item}</td>
              </tr>
              <tr>
                <td>Star</td>
                <td>{item?.item}</td>
              </tr>
              <tr>
                <td>Approval</td>
                <td>{item?.isApproved === true ? "Approved" : "Pending"}</td>
                <td onClick={handleApprovalUpdate}>Change Approval</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
