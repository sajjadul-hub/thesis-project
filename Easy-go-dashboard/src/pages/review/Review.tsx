import { useDispatch, useSelector } from "react-redux";
import "./Review.scss";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import TableForm from "../../components/TableForm/TableForm";
import Loader from "../../components/loading/loader";
import { getAllReview } from "../../features/orders/serviceApi";

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "user",
    headerName: "USER",
    width: 250,
    renderCell: (params) => {
      return (
        <>
          <img src={params?.row?.user?.photoURL || "/noavatar.png"} alt="" />
          <p style={{ marginLeft: "15px" }}>{params?.row?.user?.name}</p>
        </>
      );
    },
  },
  {
    field: "message",
    headerName: "MESSAGE",
    width: 200,
  },
  {
    field: "item",
    headerName: "REVIEWED",
    width: 200,
  },
  {
    field: "isApproved",
    headerName: "APPROVAL",
    width: 100,
  },
  {
    field: "star",
    headerName: "STAR",
    width: 150,
  },
];

function Review() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { reviewList, isLoading } = useSelector(
    (state: RootState) => state.orders
  );
  useEffect(() => {
    getAllReview(dispatch);
  }, []);

  return (
    <div>
      <div className="review-add">
        <h1>Review List</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : reviewList && reviewList.length > 0 ? (
        <DataTable slug="Review" columns={columns} rows={reviewList} />
      ) : (
        <p>Empty Review</p>
      )}
      {open && <TableForm slug="Review" setOpen={setOpen} />}
    </div>
  );
}

export default Review;
