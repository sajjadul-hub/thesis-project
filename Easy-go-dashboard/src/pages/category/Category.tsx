import { useDispatch, useSelector } from "react-redux";
import "./Category.scss";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import TableForm from "../../components/TableForm/TableForm";
import Loader from "../../components/loading/loader";
import moment from "moment";
import { getCategories } from "../../features/category/categoryAPI";

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "image",
    headerName: "ICON",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          src={
            `${import.meta.env.VITE_APP_BASE_URL}/categories/${
              params?.row?.image
            }` || "/noavatar.png"
          }
          alt=""
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Title",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "CREATED",
    width: 150,
    renderCell: (params) => {
      return <div>{moment(params.row.createdAt).format("MMM Do YY")}</div>;
    },
  },
];

function Category() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { categoryList, isLoading } = useSelector(
    (state: RootState) => state.category
  );
  useEffect(() => {
    getCategories(dispatch);
  }, []);

  return (
    <div>
      <div className="category-add">
        <h1>Category List</h1>
        <button onClick={() => setOpen(true)}>Add Category</button>
      </div>
      {isLoading ? (
        <Loader />
      ) : categoryList && categoryList.length > 0 ? (
        <DataTable slug="Category" columns={columns} rows={categoryList} />
      ) : (
        <p>Empty Category</p>
      )}
      {open && <TableForm slug="Category" setOpen={setOpen} />}
    </div>
  );
}

export default Category;
