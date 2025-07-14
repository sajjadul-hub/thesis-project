import { Link } from "react-router-dom";
import DraggableImage from "../../../../components/DraggableImage";

const QuickService = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-7 mx-[20px]">
        <Link
          to="/contact"
          className="px-5 rounded-xl bg-primary cursor-pointer w-full md:w-[50%] flex justify-center items-center gap-4 text-neutral hover:text-neutral py-4"
        >
          <i className="fa-solid fa-message text-3xl"></i>
          <h1 className="text-2xl font-bold">Contact US</h1>
        </Link>

        <button
          className="px-5 rounded-xl bg-accent cursor-pointer w-full md:w-[50%] flex justify-center items-center gap-4 text-neutral py-4"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <i className="fa-solid fa-upload"></i>
          <h1 className="text-2xl font-bold">Upload Prescription</h1>
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <DraggableImage />
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className=" absolute top-[20px]  right-[20px] bg-primary rounded-full w-6 text-neutral  hover:text-primary hover:bg-white">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default QuickService;
