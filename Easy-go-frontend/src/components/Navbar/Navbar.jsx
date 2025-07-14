/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import easyGologo from "../../assets/Logo/esayGologo.png";
import LogoBG from "../../assets/Logo/logoBG.png";
import manulcon from "../../assets/Logo/manuIcon.png";
import { Link, NavLink } from "react-router-dom";
import useScrollYPosition from "../../hooks/ScrollPosition";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { logout, setUser, toggleLoading } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";
import ProfileSideBar from "./ProfileSideBar";
import Cart from "../Cart/Cart";

const Navbar = () => {
  const scrollPosition = useScrollYPosition();
  const { email, isLoading, photoURL, displayName } = useSelector(
    (state) => state?.auth
  );
  const { quantity } = useSelector((state) => state?.mediatorCart);
  const { productquantity } = useSelector((state) => state?.cart);
  const totalquantity = quantity + productquantity;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [parent, setParent] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          })
        );
      } else {
        dispatch(toggleLoading());
      }
    });
  }, [dispatch]);

  const ParentDropdown = () => {
    setParent(!parent);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const closeParentDropdown = () => {
    setParent(false);
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="p-0 z-[100]   navbar lg:justify-between justify-evenly gap-28 lg:gap-0  mx-auto  sticky top-0 bg-transparent backdrop-filter backdrop-blur-lg ">
      {/* desktop 1st start................ */}

      <div className="navbar-start w-[23%]">
        <Link to="/" className=" md:ml-10 ">
          <img
            className=" z-[100]  relative lg:mt-3 mt-1 h-18 w-20 lg:h-30 lg:w-24 cursor-pointer"
            src={easyGologo}
            alt=""
          />
          <p className=" ms-2 text-black mt-[-8px]  hidden font-bold text-lg cursor-pointer">
            Easy Go
          </p>
        </Link>
        <div
          style={{
            height: "102px",
            left: "0",
            position: "absolute",
            top: "33px",
            width: "531px",
          }}
          className="hidden lg:block"
        >
          <p className=" ms-12 text-black mt-7 text-left font-bold text-2xl">
            Easy Go
          </p>
          <img
            className="vector-4"
            style={{
              height: "150px",
              left: "-50px",
              position: "absolute",
              top: "-32px",
              display: scrollPosition > 10 ? "none" : "",
              width: "531px",
            }}
            alt="Vector"
            src={LogoBG}
          />
          <div className="group-25" />
        </div>
      </div>
      <div>
        <h1 className="text-[#05C10C] bg1-[#05C10C] bg-secondary lg:hidden ms-12 rounded-sm  px-2 mt-3 text-left font-bold text-xl">
          {" "}
          Easy Go
        </h1>
      </div>
      {/* desktop 2nd start................ */}
      <div className=" z-50 hidden lg:flex  lg:me-[-350px]">
        <ul className="flex justify-center items-center gap-5 px-1 cursor-pointer">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[16px] text-[#05C10C] font-bold cursor-pointer"
                  : "text-[16px]  text-[#5A5F6A]  hover:text-gray-500"
              }
            >
              Home
            </NavLink>
          </li>
          <div className="dropdown relative">
            <label
              tabIndex={0}
              className="flex justify-center gap-1 items-center cursor-pointer"
              onClick={toggleDropdown}
              // onBlur={closeDropdown}
            >
              <p>Services</p>
              <svg
                className={`fill-current mt-[2px] ${
                  isOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </label>
            {/* Sub....Service..Mobel.................... */}
            {isOpen && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[100] absolute top-full shadow bg-base-100 rounded-box w-52 card-bordered"
              >
                <li>
                  <NavLink
                    to="/product-delivery"
                    className="text-left px-5 text-[#5A5F6A] text-[16px] pt-5 cursor-pointer"
                    onClick={closeDropdown}
                  >
                    Parcel delivery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/bike-rent"
                    className="text-left px-5 text-[#5A5F6A] text-[16px] pt-2 cursor-pointer"
                    onClick={closeDropdown}
                  >
                    Bike Rent
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/medicine"
                    className="text-left px-5 text-[#5A5F6A] text-[16px] pt-2 cursor-pointer"
                    onClick={closeDropdown}
                  >
                    Medicine
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="/mediator"
                    className="text-left px-5 text-[#5A5F6A] text-[16px] pt-2 pb-5 hover:text-[#38d39f] cursor-pointer"
                    onClick={closeDropdown}
                  >
                    Local Mediator
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <li className="cursor-pointer ">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-[16px] text-[#05C10C] font-bold cursor-pointer"
                  : "text-[16px]  text-[#5A5F6A]  hover:text-gray-500"
              }
            >
              Blog
            </NavLink>
          </li>
          <li className="cursor-pointer ">
            {/* The button to open modal */}

            <details className="dropdown ">
              <summary className=""> Support</summary>
              <ul className="p-4 shadow  dropdown-content z-[1] bg-base-100 rounded-box w-64">
                <li>
                  <nav className="flex flex-col">
                    <div className="flex justify-start items-center">
                      {" "}
                      <i className="fa-solid fa-phone mr-[13px]"></i>
                      <a href="tel:+8801883765008" className="link link-hover">
                        +8801883765008
                      </a>
                    </div>
                    <div className="flex justify-start items-center">
                      {" "}
                      <i className="fa-solid fa-envelope mr-[13px]"></i>
                      <a
                        href="mailto:easygocht@gmail.com"
                        className="link link-hover"
                      >
                        easygocht@gmail.com
                      </a>
                    </div>
                  </nav>
                </li>
              </ul>
            </details>
          </li>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">This modal works with a hidden checkbox!</p>
              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">
                  Close!
                </label>
              </div>
            </div>
          </div>

          <li className="cursor-pointer ">
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[16px] text-[#05C10C] font-bold cursor-pointer"
                  : "text-[16px]  text-[#5A5F6A]  hover:text-gray-500"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* desktop 3rd start................ */}

      <div className="navbar-end hidden lg:flex">
        {isLoading ? (
          <div className="me-10 bg-gray-300 rounded-full w-8 h-8"></div>
        ) : (
          <>
            {email ? (
              <div className="flex items-center mr-[60px] gap-4 ">
                {/* cart...............Modal.................... */}
                <div className="indicator">
                  <span className="indicator-item mt-[2px] text-primary font-bold">
                    {" "}
                    <p>{totalquantity > 0 ? totalquantity : ""}</p>
                  </span>
                  <div className="">
                    <Cart position={"end"} />
                  </div>
                </div>
                {/* Account.............Model................. */}
                <ProfileSideBar
                  position={""}
                  photoURL={photoURL}
                  handleLogOut={handleLogOut}
                  displayName={displayName}
                />
              </div>
            ) : (
              <>
                {" "}
                <Link to="/login">
                  <p className="text-[16px]  hover:text-gray-500  text-[#5A5F6A]  mr-10 cursor-pointer">
                    {" "}
                    Signin
                  </p>
                </Link>
                <Link to="/registration">
                  {" "}
                  <p
                    className="btn hover:text-black text-[16px]  mx-auto flex justify-center mr-10 cursor-pointer   text-white  bg-[#38d39f] rounded-xl hover:bg-[#57e0b3] hover:shadow-lg"
                    style={{ boxsShadow: "0px 4px 0px #3cbd9640" }}
                  >
                    Register
                  </p>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
