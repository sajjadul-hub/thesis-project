import PropTypes from "prop-types";

export const OrderLoading = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-[50px] my-4 w-[100%] mx-auto bg-slate-100 "
        ></div>
      ))}
    </>
  );
};

export const NotFound = ({ content, mobile }) => {
  return (
    <>
      {mobile ? (
        <div className="flex justify-center pt-40">
          <div>
            <i className=" fa-solid fa-face-sad-tear text-primary text-[150px]"></i>
            <p className="text-center pt-3 text-lg font-semibold">{content}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-12">
          <div>
            <i className=" fa-solid fa-face-sad-tear text-primary text-[150px]"></i>
          </div>
          <p className=" pt-3 text-lg font-semibold">
            Sorry, You did&apos;t Rent any Bike.
          </p>
        </div>
      )}
    </>
  );
};

NotFound.propTypes = {
  content: PropTypes.string,
  mobile: PropTypes.bool,
};
