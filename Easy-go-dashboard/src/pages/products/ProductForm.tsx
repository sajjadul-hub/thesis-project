import { ChangeEvent, useState } from "react";
import "./ProductForm.scss";
import { useDispatch } from "react-redux";
import {
  addMediator,
  updateMediator,
} from "../../features/mediator/mediatorAPI";
import Swal from "sweetalert2";
const icon = "exchange.svg";
type Props = {
  slug: string;
  setOpen: (open: boolean) => void;
  item: any;
};
function ProductForm(props: Props) {
  const { slug, setOpen, item } = props;
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const [inputData, setInputData] = useState({
    name: "",
    type: "",
    basePrice: "",
    discountPrice: "",
    description: "",
    info: "",
    categoryFlag: "",
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
      formData.append(
        "description",
        inputData.description ? inputData.description : item?.description
      );
      formData.append(
        "basePrice",
        inputData.basePrice ? inputData.basePrice : item?.basePrice
      );
      formData.append(
        "discountPrice",
        inputData.discountPrice ? inputData.discountPrice : item?.discountPrice
      );
      formData.append("info", inputData.info ? inputData.info : item?.info);
      formData.append("name", inputData.name ? inputData.name : item?.name);
      formData.append(
        "categoryFlag",
        inputData.categoryFlag ? inputData.categoryFlag : item?.categoryFlag
      );

      if (item) {
        await updateMediator(dispatch, item?._id, formData);
        Swal.fire("Updated!", "Product has been Updated.", "success");
      } else {
        await addMediator(dispatch, formData);
        Swal.fire("Added!", "Product has been added.", "success");
      }
      setOpen(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div className="img-preview">
        <h3>{item ? `Update ${slug}` : `Create ${slug}`}</h3>
        <div className="flex">
          {item && (
            <img
              className="img"
              src={`${import.meta.env.VITE_APP_BASE_URL}/products/${
                item?.image
              }`}
              alt="product"
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
              // required
              name="image"
              onChange={fileHandle}
              placeholder="Choice an Image"
            />
          </div>
          <div className="item">
            <label>Name</label>
            <input
              type="text"
              // required
              name="name"
              onChange={handleChange}
              defaultValue={item?.name}
              placeholder="Product name"
            />
          </div>
          <div className="item">
            <label>Base Price</label>
            <input
              type="number"
              // required
              name="basePrice"
              onChange={handleChange}
              defaultValue={item?.basePrice}
              placeholder="basePrice"
            />
          </div>
          <div className="item">
            <label>Discount Price</label>
            <input
              type="number"
              // required
              name="discountPrice"
              onChange={handleChange}
              defaultValue={item?.discountPrice}
              placeholder="discountPrice"
            />
          </div>
          <div>
            <div className="item">
              <label>Category</label>
              <select
                name="categoryFlag"
                onChange={handleChange}
                defaultValue={item?.categoryFlag}
              >
                <option value="@">Select Category</option>
                <option value="Local Food">Local Food</option>
                <option value="Traditional Clothes">Traditional Clothes</option>
                <option value="Handicraft">Handicraft</option>
                <option value="Vegetable">Vegetable</option>
              </select>
            </div>
          </div>
          <div className="item">
            <label>Description</label>
            <input
              type="text"
              // required
              name="description"
              onChange={handleChange}
              defaultValue={item?.description}
              placeholder="Product Description"
            />
          </div>
          <div className="item">
            <label>Info</label>
            <input
              type="text"
              // required
              name="info"
              onChange={handleChange}
              defaultValue={item?.info}
              placeholder="Others Info"
            />
          </div>
        </div>
        <div className="m_button">
          <button type="submit">{item ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}
export default ProductForm;
