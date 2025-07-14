import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import "./Category.scss";
import Swal from "sweetalert2";
import {
  addCategory,
  updateCategory,
} from "../../features/category/categoryAPI";

const icon = "exchange.svg";
type Props = {
  slug: string;
  setOpen: (open: boolean) => void;
  item?: any;
};

const CategoryForm = (props: Props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const { slug, setOpen, item } = props;
  const [inputData, setInputData] = useState({
    name: "",
  });

  function fileHandle(e: React.FormEvent<HTMLElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // handle Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      formData.append("name", inputData.name ? inputData.name : item?.name);

      if (item) {
        try {
          updateCategory(dispatch, item._id, formData);
          Swal.fire("Updated", "Banner has been updated", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to update banner", "error");
        }
      } else {
        try {
          await addCategory(dispatch, formData);
          Swal.fire("Added!", "Banner has been added.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to add the banner", "error");
        }
      }
      setOpen(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <div className="img-preview">
        <h3>{item ? `Update ${slug}` : `Create ${slug}`}</h3>
        <div className="flex">
          {item && (
            <img
              className="img"
              src={`${import.meta.env.VITE_APP_BASE_URL}/categories/${
                item?.image
              }`}
              alt="Category"
            />
          )}
          {preview && item && <img className="icon" src={icon} alt="" />}
          {preview && typeof preview === "string" && (
            <img className="img" src={preview} alt="preview" />
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <div className="item">
            <label>Category Image</label>
            <input
              type="file"
              name="image"
              onChange={fileHandle}
              placeholder="Choice an Image"
            />
          </div>
          <div className="item">
            <label>Category Name</label>
            <input
              type="text"
              required
              name="name"
              onChange={handleChange}
              defaultValue={item?.name}
              placeholder="Category Name"
            />
          </div>
        </div>
        <div className="m_button">
          <button type="submit">{item ? "Update" : "Create"}</button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
