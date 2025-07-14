import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import "./Banner.scss";
import {
  addBanner,
  getAllBanner,
  updateBanner,
} from "../../features/banner/bannerAPI";
import Swal from "sweetalert2";
const icon = "exchange.svg";
type Props = {
  slug: string;
  setOpen: (open: boolean) => void;
  item?: any;
};

const BannerForm = (props: Props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const { slug, setOpen, item } = props;
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    cat: "",
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
        formData.append("banner", file);
      }
      formData.append("title", inputData.title);
      formData.append("description", inputData.description);
      formData.append("cat", inputData.cat);

      if (item) {
        try {
          updateBanner(dispatch, item._id, formData);
          Swal.fire("Updated", "Banner has been updated", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to update banner", "error");
        }
      } else {
        try {
          await addBanner(dispatch, formData);
          Swal.fire("Added!", "Banner has been added.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to add the banner", "error");
        }
      }
      await getAllBanner(dispatch);
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
              src={`${import.meta.env.VITE_APP_BASE_URL}/banners/${
                item?.banner
              }`}
              alt="banner"
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
            <label>Image</label>
            <input
              type="file"
              required
              name="image"
              onChange={fileHandle}
              placeholder="Choice an Image"
            />
          </div>
          <div className="item">
            <label>Title</label>
            <input
              type="text"
              required
              name="title"
              onChange={handleChange}
              defaultValue={item?.title}
              placeholder="Banner Title"
            />
          </div>
          <div className="item">
            <label>Category</label>
            <select
              name="cat"
              onChange={handleChange}
              defaultValue={item?.cat}
              required
            >
              <option value="@">SELECT BANNER CATEGORY</option>
              <option value="home">Home</option>
              <option value="medicine">Medicine</option>
              <option value="mediator">Mediator</option>
              <option value="bike-rent">Bike Rent</option>
              <option value="parcel">Parcel Delivery</option>
            </select>
          </div>
        </div>
        <div className="banner-description">
          <label>Description</label>
          <textarea
            required
            name="description"
            onChange={handleChange}
            defaultValue={item?.description}
            placeholder="Banner Description"
          />
        </div>
        <div className="m_button">
          <button type="submit">{item ? "Update" : "Create"}</button>
        </div>
      </form>
    </>
  );
};

export default BannerForm;
