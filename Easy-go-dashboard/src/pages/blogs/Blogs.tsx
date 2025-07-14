import { GridColDef } from "@mui/x-data-grid";
import "./Blogs.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import DataTable from "../../components/dataTable/DataTable";
import { getBlogs } from "../../features/blogs/serviceApi";
import TableForm from "../../components/TableForm/TableForm";
import Loader from "../../components/loading/loader";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "author_img",
    headerName: "Author",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <img
            src={
              `${import.meta.env.VITE_APP_BASE_URL}/blogs/${
                params?.row?.author_img
              }` || "/noavatar.png"
            }
            alt=""
          />
          <p style={{ marginLeft: "20px" }}>{params.row.author_name}</p>
        </>
      );
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    renderCell: (params) => {
      console.log(params.row.title);
      return (
        <>
          <img
            src={
              `${import.meta.env.VITE_APP_BASE_URL}/blogs/${
                params?.row?.image
              }` || "/noavatar.png"
            }
            alt=""
          />
          <p style={{ marginLeft: "20px" }}>
            {params.row?.title?.slice(0, 30) + "..."}
          </p>
        </>
      );
    },
    width: 300,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 100,
    type: "string",
  },
];

const Blogs = () => {
  const { blogList, isLoading } = useSelector((state: RootState) => state.blog);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs(dispatch);
  }, []);
  const skeletons = blogList.length;
  return (
    <div className="blogs">
      <div className="info">
        <h1>Blog List</h1>
        <button onClick={() => setOpen(true)}>Add New Blog</button>
      </div>
      {isLoading ? (
        <Loader skeletons={skeletons} />
      ) : blogList ? (
        <DataTable slug="Blog" columns={columns} rows={blogList} />
      ) : (
        <p>No Blog Found</p>
      )}

      {open && <TableForm slug="Blog" setOpen={setOpen} />}
    </div>
  );
};

export default Blogs;
