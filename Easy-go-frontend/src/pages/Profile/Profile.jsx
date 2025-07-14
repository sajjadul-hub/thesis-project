/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import PageTitle from "../../utils/PageTitle";
import start from "../../assets/ServicesImg/starImg.png";
import start1 from "../../assets/ServicesImg/starsmall.png";
const Profile = () => {
  const { email, isLoading, photoURL, name } = useSelector(
    (state) => state?.user.currentUser
  );
  const { bookings } = useSelector((state) => state?.bikeRent);
  return (
    <div
      style={{
        backgroundImage: `url(${start})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "30px ",
        backgroundPosition: "900px 200px",
      }}
      className=" mt-24 mb-20 w-[70%] mx-auto border-secondary border-[1px] rounded-lg lg:grid grid-cols-12 py-6 px-5"
    >
      <PageTitle title="Profile" />
      <div className=" col-span-4 flex flex-col justify-center items-center gap-3">
        <img
          className="lg:h-[130px] lg:w-[130px] rounded-full"
          src={photoURL}
          referrerPolicy="no-referrer"
          alt=""
        />
        <button className=" btn hover:text-white lg:text-[12px]  mx-auto  cursor-pointer   text-white  bg-[#38d39f] rounded-xl hover:bg-[#57e0b3] hover:shadow-lg">
          Edit Profile
        </button>
      </div>

      <div className=" col-span-8 flex flex-col gap-2">
        <div>
          <p className="lg:text-xl font-semibold">Name:</p>
          <h1>{name}</h1>
        </div>

        <div>
          {" "}
          <p className="lg:text-xl font-semibold">Email:</p>
          <p>{email}</p>
        </div>
        {bookings[0]?.nid &&
          bookings[0]?.phoneNumber &&
          bookings[0]?.drivingLicense && (
            <>
              <div>
                <p className="lg:text-xl font-semibold">Phone Number:</p>
                {bookings[0]?.phoneNumber}
              </div>
              <div>
                <p className="text-xl font-semibold">Driving License:</p>
                {bookings[0]?.drivingLicense}
              </div>
              <div>
                <p className="text-xl font-semibold">NID</p>
                {bookings[0]?.nid}
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Profile;
