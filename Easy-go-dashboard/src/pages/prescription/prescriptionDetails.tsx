import { useCallback } from "react";
import "./prescription.scss";
import moment from "moment";
type Props = {
  slug: string;
  item?: any;
  setOpen: (open: boolean) => void;
};
function PrescriptionDetails(props: Props) {
  const { slug, item } = props;
  const imageUrl = `${import.meta.env.VITE_APP_BASE_URL}/medicines/${
    item?.img
  }`;
  const filename = `prescription${item._id}.jpg`;

  //Image download handler
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error while downloading image", error);
    }
  }, [imageUrl, filename]);
  return (
    <div>
      <h3>{slug} Details</h3>
      <div className="prescription-details">
        <div className="prescription-img">
          <img
            src={
              `${import.meta.env.VITE_APP_BASE_URL}/prescriptions/${
                item?.prescription
              }` || "/noavatar.png"
            }
            alt=""
          />
        </div>
        <div className="author">
          <p>ID: {item?._id}</p>
          <p>Name: {item?.user?.name}</p>
          <p>Email: {item?.user?.email}</p>
          <p>
            Number: {item?.user?.phoneNumber ? item?.user?.phoneNumber : "-"}
          </p>
          <p>Submitted: {moment(item?.createdAt).format("MMM Do YY")}</p>
          <p>Payment: {item?.paymentStatus}</p>
          <p>Shipping: {item?.shippingStatus}</p>
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
    </div>
  );
}
export default PrescriptionDetails;
