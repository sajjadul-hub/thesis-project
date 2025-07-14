/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating-stars-component";
import { addReview } from "../../features/review/serviceApi";

const ReviewForm = ({ orderId, item }) => {
  const { register, handleSubmit } = useForm();
  const { photoURL, name, _id } = useSelector(
    (state) => state?.user?.currentUser
  );
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const reviewData = {
      user: _id,
      ...data,
      star: rating,
      orderId,
      item,
    };

    addReview(dispatch, reviewData)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center gap-4">
          <div>
            <div className="avatar ">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {photoURL ? (
                  <img src={photoURL} referrerPolicy="no-referrer" />
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </div>
            </div>
            <h1 className="mt-4">{name}</h1>
          </div>
          <div className="mb-4">
            <textarea
              {...register("message")}
              className="textarea textarea-success w-52 h-28"
              placeholder="Bio"
            ></textarea>

            <div className="mt-2">
              <div className="flex text-2xl text-primary ">
                <Rating
                  count={5}
                  size={40}
                  activeColor="#ffd700"
                  value={rating}
                  onChange={handleRatingChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <button
            type="submit"
            className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:text-black"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
