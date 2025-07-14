import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import "./Medicine.scss";
import { getMedicines } from "../../features/medicines/medicineAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import DataTable from "../../components/dataTable/DataTable";
import TableForm from "../../components/TableForm/TableForm";
import Loader from "../../components/loading/loader";
const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "img",
    headerName: "Medicine",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <img
            src={
              `${import.meta.env.VITE_APP_BASE_URL}/medicines/${
                params?.row?.img
              }` || "/noavatar.png"
            }
            alt=""
          />
          <p style={{ marginLeft: "20px" }}>{params.row.name}</p>
        </>
      );
    },
  },
  {
    field: "cat",
    headerName: "Category",
    width: 100,
    type: "string",
  },
  {
    field: "basePrice",
    headerName: "Base Price",
    width: 120,
    type: "number",
  },
  {
    field: "discountPrice",
    headerName: "Discount Price",
    width: 130,
    type: "number",
  },
  {
    field: "discount",
    headerName: "Discount",
    width: 100,
    type: "number",
  },
  {
    field: "group",
    headerName: "Group",
    width: 100,
    type: "string",
  },
  {
    field: "power",
    headerName: "Power",
    width: 100,
    type: "string",
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
    type: "string",
  },
];

const Medicine = () => {
  const { medicineList, isLoading } = useSelector(
    (state: RootState) => state.medicine
  );

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getMedicines(dispatch);
  }, []);
  const skeletons = medicineList.length;
  return (
    <div className="medicine">
      <div className="info">
        <h1>Medicines</h1>
        <button onClick={() => setOpen(true)}>Add New Medicine</button>
      </div>
      {isLoading ? (
        <Loader skeletons={skeletons} />
      ) : medicineList && medicineList.length > 0 ? (
        <DataTable slug="Medicine" columns={columns} rows={medicineList} />
      ) : (
        <p>NO! Medicine Found</p>
      )}

      {open && <TableForm slug="Medicine" setOpen={setOpen} />}
    </div>
  );
};

export default Medicine;
