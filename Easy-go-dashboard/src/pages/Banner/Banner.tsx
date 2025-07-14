import { useDispatch, useSelector } from "react-redux";
import "./Banner.scss";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { getAllBanner } from "../../features/banner/bannerAPI";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import TableForm from "../../components/TableForm/TableForm";
import Loader from "../../components/loading/loader";

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "banner",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          src={
            `${import.meta.env.VITE_APP_BASE_URL}/banners/${
              params?.row?.banner
            }` || "/noavatar.png"
          }
          alt=""
        />
      );
    },
  },
  {
    field: "cat",
    headerName: "Category",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created Date",
    width: 120,
  },
  {
    field: "updatedAt",
    headerName: "Updated",
    width: 120,
  },
];
function Banner() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { bannerList, isLoading } = useSelector(
    (state: RootState) => state.banner
  );
  useEffect(() => {
    getAllBanner(dispatch);
  }, []);

  return (
    <div>
      <div className="banner-add">
        <h1>Banner List</h1>
        <button onClick={() => setOpen(true)}>Add New Banner</button>
      </div>
      {isLoading ? (
        <Loader />
      ) : bannerList && bannerList.length > 0 ? (
        <DataTable slug="Banner" columns={columns} rows={bannerList} />
      ) : (
        <p>Empty Banner</p>
      )}
      {open && <TableForm slug="Banner" setOpen={setOpen} />}
    </div>
  );
}

export default Banner;
