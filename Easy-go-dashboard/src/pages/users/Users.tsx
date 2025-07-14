import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useEffect, useState } from "react";
import { getUser } from "../../features/users/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TableForm from "../../components/TableForm/TableForm";
import Loader from "../../components/loading/loader";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "photoURL",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params?.row?.photoURL || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "User Name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phoneNumber",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
];

const Users = () => {
  const { userList, isLoading } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  console.log(userList);

  useEffect(() => {
    getUser(dispatch);
  }, []);
  const skeletons = userList.length;
  return (
    <div className="users">
      <div className="info">
        <h1>User List</h1>
      </div>
      {isLoading ? (
        <Loader skeletons={skeletons} />
      ) : userList ? (
        <DataTable slug="User" columns={columns} rows={userList} />
      ) : (
        <p>No User Found</p>
      )}

      {open && <TableForm slug="User" setOpen={setOpen} />}
    </div>
  );
};

export default Users;
