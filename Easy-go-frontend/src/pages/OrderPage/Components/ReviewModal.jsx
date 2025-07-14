import ReviewForm from "../../../components/Form/ReviewForm";

const ReviewModal = () => {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="p-2 hover:text-black text-[15px] flex justify-center cursor-pointer    text-white  bg-primary rounded-full hover:bg-[#57e0b3]"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <i className="fa-regular fa-star"></i>
      </button>
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle bg-primary left-0 top-2">
              ✕
            </button>
          </form>

          <ReviewForm />
        </div>
      </dialog>
    </div>
  );
};

export default ReviewModal;
