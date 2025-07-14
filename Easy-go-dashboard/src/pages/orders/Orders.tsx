import { ChangeEvent, useEffect, useState } from "react";
import "./Orders.scss";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getBikeBookingList,
  getMedicineOrderList,
  getParcelBookingList,
  getProductOrderList,
} from "../../features/orders/serviceApi";
import { RootState } from "../../app/store";
import Loader from "../../components/loading/loader";

const bikeRentColumns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "USER",
    width: 200,
    renderCell: (params) => {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={params.row.user?.photoURL || "/noavatar.png"} alt="" />
          {params.row.name} - {params.row.gender}
        </div>
      );
    },
  },
  {
    field: "phoneNumber",
    type: "string",
    headerName: "NUMBER",
    width: 150,
  },
  {
    field: "nid",
    type: "string",
    headerName: "NID NUMBER",
    width: 150,
  },
  {
    field: "drivingLicense",
    type: "string",
    headerName: "DRIVING LICENSE",
    width: 150,
  },
  {
    field: "area",
    headerName: "TRAVEL",
    type: "string",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params.row.from} - {params.row.destination}
        </div>
      );
    },
  },
  {
    field: "fuel",
    headerName: "NUMBER OF FUEL",
    width: 100,
    type: "string",
  },
  {
    field: "date",
    headerName: "DATE",
    width: 150,
    type: "string",
    renderCell: (params) => {
      return (
        <div>
          {params.row.start_date} - {params.row.end_date}
        </div>
      );
    },
  },
  {
    field: "time",
    headerName: "TIME",
    width: 100,
    type: "string",
    renderCell: (params) => {
      return (
        <div>
          {params.row.start_time} - {params.row.end_time}
        </div>
      );
    },
  },
  {
    field: "rider",
    headerName: "RIDER",
    width: 100,
    type: "string",
  },
  {
    field: "bikeType",
    headerName: "BIKE TYPE",
    width: 100,
    type: "string",
  },
  {
    field: "paymentStatus",
    headerName: "PAYMENT STATUS",
    width: 150,
    type: "string",
  },
  {
    field: "rentStatus",
    headerName: "RENT STATUS",
    width: 150,
    type: "string",
  },
  {
    field: "total_amount",
    headerName: "TOTAL AMOUNT",
    width: 100,
    type: "number",
  },
];

const parcelBookingColumns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "sender_name",
    headerName: "SENDER",
    width: 150,
    type: "string",
  },
  {
    field: "sender_address",
    type: "string",
    headerName: "SENDER ADDRESS",
    width: 200,
  },
  {
    field: "primary_num",
    type: "string",
    headerName: "SENDER NUMBER",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params.row.primary_num} / {params.row.secondary_num}
        </div>
      );
    },
  },
  {
    field: "receiver_name",
    type: "string",
    headerName: "RECEIVER",
    width: 150,
  },
  {
    field: "receiver_address",
    type: "string",
    headerName: "RECEIVER ADDRESS",
    width: 150,
  },
  {
    field: "receiver_phone",
    type: "string",
    headerName: "RECEIVER NUMBER",
    width: 150,
  },
  {
    field: "paymentStatus",
    type: "string",
    headerName: "PAYMENT",
    width: 150,
  },
  {
    field: "parcelStatus",
    type: "string",
    headerName: "DELIVERY",
    width: 150,
  },
  {
    field: "total_amount",
    type: "number",
    headerName: "TOTAL AMOUNT",
    width: 150,
  },
];
const medicineOrderColumn: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "USER",
    width: 200,
    renderCell: (params) => {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={params.row.user?.photoURL || "/noavatar.png"} alt="" />
          {params.row.user.name}
        </div>
      );
    },
  },
  {
    field: "address",
    headerName: "ADDRESS",
    width: 150,
    type: "string",
  },
  {
    field: "phoneNumber",
    type: "string",
    headerName: "NUMBER",
    width: 200,
  },
  {
    field: "paymentStatus",
    type: "string",
    headerName: "PAYMENT",
    width: 200,
  },
  {
    field: "shippingStatus",
    type: "string",
    headerName: "SHIPPING",
    width: 150,
  },
  {
    field: "totalPrice",
    type: "string",
    headerName: "TOTAL",
    width: 150,
  },
];

const Orders = () => {
  const { bookingList, isLoading } = useSelector(
    (state: RootState) => state.booking
  );
  console.log(bookingList);

  const dispatch = useDispatch();

  const [service, setService] = useState("bike-rent");
  const handleOrders = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setService(e.target.value);
  };

  useEffect(() => {
    if (service === "bike-rent") {
      getBikeBookingList(dispatch);
    } else if (service === "parcel") {
      getParcelBookingList(dispatch);
    } else if (service === "medicine") {
      getMedicineOrderList(dispatch);
    } else if (service === "local-product") {
      getProductOrderList(dispatch);
    }
  }, [service]);

  return (
    <div className="orders">
      <div className="info">
        <h1>Orders</h1>
        <div className="item">
          <label>ORDERS</label>
          <select name="type" onChange={handleOrders} value={service}>
            <option disabled value="@">
              SELECT ORDERS
            </option>
            <option value="bike-rent">BIKE RENT</option>
            <option value="parcel">PARCEL DELIVERY</option>
            <option value="medicine">MEDICINE</option>
            <option value="local-product">LOCAL PRODUCT</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable
          slug="Orders Details"
          service={service}
          columns={
            service === "bike-rent"
              ? bikeRentColumns
              : service === "parcel"
              ? parcelBookingColumns
              : service === "medicine" || service === "local-product"
              ? medicineOrderColumn
              : []
          }
          rows={bookingList}
        />
      )}
    </div>
  );
};

export default Orders;
