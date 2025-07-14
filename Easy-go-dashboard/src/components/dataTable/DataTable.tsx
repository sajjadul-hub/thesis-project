import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteMedicine,
  deletePrescription,
} from "../../features/medicines/medicineAPI";
import TableForm from "../TableForm/TableForm";
import { deleteBlog } from "../../features/blogs/serviceApi";
import { deleteBanner } from "../../features/banner/bannerAPI";
import Swal from "sweetalert2";
import { deleteMediator } from "../../features/mediator/mediatorAPI";
import { deleteCategory } from "../../features/category/categoryAPI";
import { deleteMedicineOrder } from "../../features/orders/serviceApi";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  service?: string;
};

const DataTable = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState([]);

  const dispatch = useDispatch();
  //update medicine
  const handleUpdate = (id: string) => {
    const filteredData = props.rows.find((item: any) => item?._id === id);
    if (filteredData) {
      setItem(filteredData);
    }
    setOpen(true);
  };

  //delete medicine
  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        if (props.slug === "Medicine") {
          await deleteMedicine(dispatch, id);
          Swal.fire("Deleted!", "Medicine has been deleted.", "success");
        } else if (props.service === "medicine") {
          await deleteMedicineOrder(dispatch, id);
          Swal.fire("Deleted!", "Medicine Order has been deleted.", "success");
        } else if (props.slug === "Product") {
          await deleteMediator(dispatch, id);
          Swal.fire("Deleted!", "products has been deleted.", "success");
        } else if (props.slug === "blog") {
          await deleteBlog(dispatch, id);
          Swal.fire("Deleted!", "Blog has been deleted.", "success");
        } else if (props.slug === "Banner") {
          await deleteBanner(dispatch, id);
          Swal.fire("Deleted!", "Banner has been deleted.", "success");
        } else if (props.slug === "Category") {
          await deleteCategory(dispatch, id);
          Swal.fire("Deleted!", "Banner has been deleted.", "success");
        } else if (props.slug === "Prescription") {
          deletePrescription(dispatch, id);
        } else {
          Swal.fire({
            title: "Request Denied!",
            text: "Not allowed to delete operation!",
            icon: "warning",
            timer: 3000,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      console.error(error);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <button
            className="update"
            onClick={() => handleUpdate(params.row._id)}
          >
            <img src="/view.svg" alt="" />
          </button>
          <button
            title="Delete"
            className="delete"
            onClick={() => handleDelete(params?.row?._id)}
          >
            <img src="/delete.svg" alt="" />
          </button>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        getRowId={(row) => row._id}
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      {open && item && (
        <TableForm
          slug={props.slug}
          service={props.service}
          setOpen={setOpen}
          item={item}
        />
      )}
    </div>
  );
};

export default DataTable;
