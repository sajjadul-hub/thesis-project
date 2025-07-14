import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addMedicine,
  getMedicines,
  updateMedicine,
} from "../../features/medicines/medicineAPI";
import "./MedicineForm.scss";
import Swal from "sweetalert2";
const icon = "exchange.svg";
type Props = {
  slug: string;
  setOpen: (open: boolean) => void;
  item?: any;
};

const MedicineForm = (props: Props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const { slug, setOpen, item } = props;
  const [inputData, setInputData] = useState({
    name: "",
    power: "",
    type: "",
    group: "",
    pharmacyName: "",
    basePrice: "",
    discountPrice: "",
    about: "",
    info: "",
    cat: "",
    strip: "",
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
        formData.append("img", file);
      }
      formData.append("about", inputData.about ? inputData.about : item?.about);
      formData.append(
        "basePrice",
        inputData.basePrice ? inputData.basePrice : item.basePrice
      );
      formData.append(
        "discountPrice",
        inputData.discountPrice ? inputData.discountPrice : item?.discountPrice
      );
      formData.append("group", inputData.group ? inputData.group : item?.group);
      formData.append("info", inputData.info ? inputData.info : item?.info);
      formData.append("name", inputData.name ? inputData.name : item?.name);
      formData.append(
        "pharmacyName",
        inputData.pharmacyName ? inputData.pharmacyName : item?.pharmacyName
      );
      formData.append("power", inputData.power ? inputData.power : item?.power);
      formData.append("type", inputData.type ? inputData.type : item?.type);
      formData.append("cat", inputData.cat ? inputData.cat : item?.cat);
      formData.append("strip", inputData.strip ? inputData.strip : item?.strip);

      if (item) {
        await updateMedicine(dispatch, item?._id, formData);
        Swal.fire("Updated!", "Medicine has been Updated.", "success");
      } else {
        await addMedicine(dispatch, formData);
        Swal.fire("Added!", "Medicine has been added.", "success");
      }
      await getMedicines(dispatch);
      setOpen(false);
      console.log("Form data", formData);
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
              src={`${import.meta.env.VITE_APP_BASE_URL}/medicines/${
                item?.img
              }`}
              alt="medicine"
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
              placeholder="Medicine name"
            />
          </div>
          <div className="item">
            <label>Power</label>
            <input
              type="text"
              // required
              name="power"
              onChange={handleChange}
              defaultValue={item?.power}
              placeholder="500mg,100ml"
            />
          </div>
          <div className="item">
            <label>Type</label>
            <select
              name="type"
              onChange={handleChange}
              defaultValue={item?.type}
            >
              <option value="@">SELECT MEDICINE TYPE</option>
              <option value="tablet">TABLET</option>
              <option value="syrup">SYRUP</option>
              <option value="paste">PASTE</option>
              <option value="powder">POWDER</option>
              <option value="capsule">CAPSULE</option>
              <option value="saline">SALINE</option>
              <option value="injection">INJECTION</option>
              <option value="other">OTHERS</option>
            </select>
          </div>
          <div className="item">
            <label>Group</label>
            <input
              type="text"
              // required
              name="group"
              onChange={handleChange}
              defaultValue={item?.group}
              placeholder="Parasitamol"
            />
          </div>
          <div className="item">
            <label>Pharmacy Name</label>
            <input
              type="text"
              // required
              name="pharmacyName"
              onChange={handleChange}
              defaultValue={item?.pharmacyName}
              placeholder="pharmacyName"
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
          <div className="item">
            <label>Category</label>
            <select name="cat" onChange={handleChange} defaultValue={item?.cat}>
              <option value="@">Select Category</option>
              <option value="otc">OTC Medicine</option>
              <option value="women">Women Choice</option>
              <option value="sexual">Sexual Wellness</option>
              <option value="diabetic">Diabetic Care</option>
              <option value="baby">Baby Care</option>
              <option value="dental">Dental Care</option>
              <option value="personal">Personal Care</option>
              <option value="prescription">Prescription</option>
            </select>
          </div>
          <div className="item">
            <label>About</label>
            <input
              type="text"
              // required
              name="about"
              onChange={handleChange}
              defaultValue={item?.about}
              placeholder="Medicine Description"
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
    </>
  );
};

export default MedicineForm;
