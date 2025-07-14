import { GridColDef } from "@mui/x-data-grid";
import "./prescription.scss";
import { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import TableForm from "../../components/TableForm/TableForm";
import { getPrescription } from "../../features/medicines/medicineAPI";
import Loader from "../../components/loading/loader";
const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "customer",
    headerName: "Customer",
    width: 200,
    renderCell: (params) => {
      console.log(params.row.user.name);
      return (
        <>
          <img src={params.row.user.photoURL || "noavatar.png"} alt="" />
          <p style={{ marginLeft: "20px" }}>{params.row.user.name}</p>
        </>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    renderCell: (params) => {
      return <p style={{ marginLeft: "20px" }}>{params?.row?.user?.email}</p>;
    },
  },
  {
    field: "phoneNumber",
    headerName: "Number",
    width: 200,
    renderCell: (params) => {
      return (
        <p style={{ marginLeft: "20px" }}>
          {params?.row?.user?.phoneNumber
            ? params?.row?.user?.phoneNumber
            : "-"}
        </p>
      );
    },
  },
  {
    field: "img",
    headerName: "Prescription",
    width: 100,
    renderCell: (params) => {
      console.log(params.row);
      return (
        <>
          <img
            src={
              `${import.meta.env.VITE_APP_BASE_URL}/prescriptions/${
                params?.row?.prescription
              }` || "noavatar.png"
            }
            alt=""
          />
          <p style={{ marginLeft: "20px" }}>{params.row.name}</p>
        </>
      );
    },
  },
  {
    field: "paymentStatus",
    headerName: "Payment",
    width: 100,
  },
  {
    field: "shippingStatus",
    headerName: "Shipping",
    width: 100,
  },
];
function Prescription() {
  const { isLoading, prescriptionList } = useSelector(
    (state: RootState) => state.medicine
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getPrescription(dispatch);
  }, []);

  return (
    <div className="medicine">
      <div className="info">
        <h1>Prescription</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : prescriptionList && prescriptionList.length > 0 ? (
        <DataTable
          slug="Prescription"
          columns={columns}
          rows={prescriptionList}
        />
      ) : (
        <p>NO! Prescription Found</p>
      )}

      {open && <TableForm slug="Prescription" setOpen={setOpen} />}
    </div>
  );
}

export default Prescription;
