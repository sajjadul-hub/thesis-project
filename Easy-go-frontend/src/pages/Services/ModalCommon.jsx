import Modal from "react-modal";
import "./ModalCommon.css";
import PropTypes from "prop-types";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function ModalCommon({
  isModalOpen,
  afterOpenModal,
  closeModal,
  productDetails,
}) {
  console.log(productDetails);
  return (
    <Modal
      isOpen={isModalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="medicine"
      overlayClassName="custom-overlay"
    >
      <div className="md:w-[700px] w-full">
        <div className="text-right">
          <button
            className="hover:text-red-500 font-bold p-2"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="flex flex-col justify-center">
          <div className="rounded-[18px] flex justify-center items-center mx-auto py-2 w-[200px] h-[200px]">
            <img
              className="w-[100%] h-[100%]"
              src={productDetails?.image}
              alt="Medicine Image"
            />
          </div>
          <div className="my-4">
            {" "}
            <h1 className="text-2xl font-bold">{productDetails?.title}</h1>
            <span className="text-xl text-[#343131] italic font-semibold">
              {productDetails?.group}
            </span>
            <p className="text-[#777E90]">{productDetails?.description}</p>
            <p className="text-[#000] font-bold">
              Price: ৳{productDetails?.price}
            </p>
          </div>
          <div className="flex justify-center items-center gap-6 my-3">
            {" "}
            <button className=" uppercase text-[#3CBD96] font-semibold hover:text-black  text-lg">
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <button className=" uppercase text-[#3CBD96] font-semibold hover:text-black  text-lg">
              <i className="fa-regular fa-heart"></i>
            </button>
            <button className=" capitalize text-[#3CBD96] font-semibold hover:text-black  text-lg">
              Buy
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ModalCommon.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  productDetails: PropTypes.object.isRequired,
};
