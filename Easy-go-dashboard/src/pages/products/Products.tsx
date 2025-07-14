import { useState, useEffect } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";

import TableForm from "../../components/TableForm/TableForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getMediators } from "../../features/mediator/mediatorAPI";
import Loader from "../../components/loading/loader";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "image",
    headerName: "products",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <img
            src={
              `${import.meta.env.VITE_APP_BASE_URL}/products/${
                params?.row?.image
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
    field: "categoryFlag",
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

  // {
  //   field: "type",
  //   headerName: "Type",
  //   width: 100,
  //   type: "string",
  // },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const { mediatorsList, isLoading } = useSelector(
    (state: RootState) => state?.mediator
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getMediators(dispatch);
  }, []);
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>

      {isLoading ? (
        <Loader />
      ) : mediatorsList && mediatorsList.length > 0 ? (
        <DataTable slug="Product" columns={columns} rows={mediatorsList} />
      ) : (
        <p>NO! Product Found</p>
      )}
      {open && <TableForm slug="Product" setOpen={setOpen} />}
    </div>
  );
};

export default Products;
