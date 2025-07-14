import { useState } from "react";
import { useSelector } from "react-redux";
import { formDataRequest } from "../requestMethod";
import Swal from "sweetalert2";

const DraggableImageInput = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [uploadimg, setUpLoadimg] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("user", currentUser?._id);
    formData.append("prescription", uploadimg);

    formDataRequest.post(`/prescription/add-prescription`, formData);
    Swal.fire({
      title: "Prescription Uploaded Successfully",
      icon: "success",
      confirmButtonColor: "#3CBD96 ",
    });
    document.getElementById("my_modal_1").click();
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        className="lg:h-[50vh] h-[40vh] w-[80%] border-2 border-dashed border-gray-400 rounded-lg p-2 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="   lg:h-[45vh] h-[40vh] w-[70vw] object-contain"
          />
        ) : (
          <i className="text-9xl mt-16 text-gray-400 fa-regular fa-user"></i>
        )}
      </div>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          setUpLoadimg(file);
          if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      {!uploadimg ? (
        <label
          htmlFor="imageInput"
          className=" relative top-9 p-2 px-4 bg-primary text-white cursor-pointer rounded-lg"
        >
          Upload Image
        </label>
      ) : (
        <button
          onClick={handleSubmit}
          className=" relative top-9 p-2 px-4 bg-primary text-white cursor-pointer rounded-lg"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default DraggableImageInput;
