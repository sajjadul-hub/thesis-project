/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileSideBar = ({
  photoURL,
  position,
  handleLogOut,

  displayName,
}) => {
  const [account, setAccount] = useState(false);
  const accountDropdown = () => {
    setAccount(!account);
  };

  const closeAccountDropdown = () => {
    setAccount(false);
  };

  return (
    <div>
      <div className={`dropdown dropdown-${position} dropdown-end `}>
        {photoURL ? (
          <label
            tabIndex={0}
            onClick={accountDropdown}
            title="Account"
            className="hover:border-2 hover:border-primary dropdown border-[1px] rounded-full h-8 w-8 flex justify-center items-center hover:bg-primary text-primary hover:text-white cursor-pointer"
          >
            <img
              className="rounded-full"
              referrerPolicy="no-referrer"
              src={photoURL}
              alt=""
            />
          </label>
        ) : (
          <label
            tabIndex={0}
            onClick={accountDropdown}
            title="Account"
            className=" border-[1px] rounded-full h-8 w-8 flex justify-center items-center hover:bg-primary text-primary hover:text-white cursor-pointer"
          >
            <i className="text fa-solid fa-user text-lg "></i>
          </label>
        )}

        {account && (
          <ul
            tabIndex={0}
            className="overflow-y-auto dropdown-content z-[1] duration-500 p-2 shadow card-bordered lg:mt-4 lg:mb-auto rounded-box lg:w-[20vw] bg-white lg:bg-secondary lg:mr-[-55px] px-5 lg:h-[45vh]  h-[101vh] w-[60vw] mb-[-55px] mr-[-40px] lg:pt-0 pt-20"
          >
            <li className="flex justify-start items-center flex-col mt-4">
              {photoURL ? (
                <img
                  className="h-[60px] w-[60px] rounded-full"
                  src={photoURL}
                  referrerPolicy="no-referrer"
                  alt=""
                />
              ) : (
                <div className=" border-[1px] rounded-full h-8 w-8 flex justify-center items-center hover:bg-primary text-primary hover:text-white cursor-pointer">
                  <i className="text fa-solid fa-user text-lg "></i>
                </div>
              )}
              <h1 className="text-[18px] font-[600] my-2">{displayName}</h1>
              <Link
                to="/profile"
                onClick={closeAccountDropdown}
                className=" btn hover:text-white text-[16px]  mx-auto flex justify-center cursor-pointer   text-white  bg-[#38d39f] rounded-xl hover:bg-[#57e0b3] hover:shadow-lg"
              >
                View Profile
              </Link>
            </li>
            <li onClick={closeAccountDropdown} className="">
              <Link
                className=" text-primary text-[15px] uppercase flex justify-start items-center cursor-pointer  pt-5 gap-3  hover:text-black"
                to="/order "
              >
                <i className="fa-solid fa-bag-shopping "></i>
                Order
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="flex justify-start items-center cursor-pointer text[15px]  pt-5 gap-3 text-primary  hover:text-black"
              >
                <i className="fa-solid fa-right-from-bracket "></i>{" "}
                <p className="uppercase ">Log out</p>
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileSideBar;
