import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { logout } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";
import ProfileSideBar from "../Navbar/ProfileSideBar";

const BottomBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [parent, setParent] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const dispatch = useDispatch();
  const { photoURL, displayName } = useSelector((state) => state?.auth);
  const { productquantity } = useSelector((state) => state?.cart);
  const { quantity, mediators } = useSelector((state) => state?.mediatorCart);
  const totalquantity = quantity + productquantity;
  const cat = mediators?.data;
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
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  const medicine = location.pathname.split("/").includes("medicine");
  const mediator = location.pathname.split("/").includes("mediator");
  return (
    <div
      style={{
        display: "flex ",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className=" btm-nav z-[100] bg-secondary border-t-[1px] border-primary "
    >
      <div
        style={{ display: medicine || mediator ? "none" : "" }}
        className="dropdown dropdown-top "
      >
        {/* Mobile navbar */}
        <label
          tabIndex={0}
          onClick={ParentDropdown}
          className=" btn btn-ghost  relative top-2 left-2 text-primary "
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </label>
        {parent && (
          <ul
            tabIndex={0}
            className="dropdown-content h-[100vh] pt-16 mb-[-63px] z-[1]  p-2 shadow bg-base-100 rounded-l-lg w-52 cursor-pointer "
          >
            <li className="ms-5 mt-4">
              <div className="dropdown dropdown-right">
                <label
                  tabIndex={0}
                  className="flex justify-center gap-1 items-center cursor-pointer"
                  onClick={() => toggleDropdown()}
                  //   onBlur={closeDropdown}
                >
                  <p>
                    <i className="fa-solid fa-server me-5"></i> Services
                  </p>
                  <svg
                    className={`fill-current mt-[2px] ${
                      isOpen ? "" : "rotate-180"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </label>
                {isOpen && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content mb-[-190px]  z-[100] relative top-full shadow bg-base-100 rounded-box w-52 card-bordered  "
                  >
                    <li>
                      <NavLink
                        to="/product-delivery"
                        className="text-left px-5 text-[#5A5F6A] text-[16px] pt-5 hover:text-[#38d39f] cursor-pointer"
                        onClick={closeDropdown}
                      >
                        <p>
                          {" "}
                          <i className="fa-solid fa-truck me-5"></i>
                          Parcel delivery
                        </p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/bike-rent"
                        className="text-left px-5 text-[#5A5F6A] text-[16px] pt-2 hover:text-[#38d39f] cursor-pointer"
                        onClick={closeDropdown}
                      >
                        <p>
                          <i className="fa-solid fa-motorcycle me-5"></i>
                          Bike Rent
                        </p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/medicine"
                        className="text-left px-5 text-[#5A5F6A] text-[16px] pt-2 hover:text-[#38d39f] cursor-pointer"
                        onClick={closeDropdown}
                      >
                        <p>
                          <i className="fa-solid fa-box me-5"></i>
                          Medicine
                        </p>
                      </NavLink>
                    </li>
                    <li>
                      <Link
                        to="/mediator"
                        className="text-left px-5 text-[#5A5F6A] text-[16px] pt-2 pb-5 hover:text-[#38d39f] cursor-pointer"
                        onClick={closeDropdown}
                      >
                        <p>
                          <i className="fa-brands fa-telegram me-5"></i>
                          Local Mediator
                        </p>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={closeParentDropdown}
                className={({ isActive }) =>
                  isActive
                    ? " text-[16px] text-[#05C10C] font-bold  text-left px-5 pt-5 cursor-pointer"
                    : " text-[16px] text-left px-5 pt-5  text-[#5A5F6A]  hover:text-gray-500"
                }
              >
                <p>
                  <i className="fa-solid fa-address-book me-5"></i>
                  Contact
                </p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/blog"
                onClick={closeParentDropdown}
                className={({ isActive }) =>
                  isActive
                    ? " text-[16px] text-[#05C10C] font-bold text-left px-5 pt-5 cursor-pointer"
                    : " text-[16px]  text-[#5A5F6A]  hover:text-gray-500 text-left px-5 pt-5 cursor-pointer"
                }
              >
                <p>
                  <i className="fa-solid fa-blog me-5"></i>
                  Blog
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                onClick={closeParentDropdown}
                className={({ isActive }) =>
                  isActive
                    ? " text-[16px] text-[#05C10C] font-bold text-left px-5 pt-5 cursor-pointer"
                    : " text-[16px]  text-[#5A5F6A]  hover:text-gray-500 text-left px-5 pt-5 cursor-pointer"
                }
              >
                <p>
                  <i className="fa-solid fa-right-to-bracket me-5"></i>
                  Signin
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/registration"
                onClick={closeParentDropdown}
                className={({ isActive }) =>
                  isActive
                    ? " text-[16px] text-[#05C10C] font-bold text-left px-5 pt-5 pb-5 cursor-pointer"
                    : " text-[16px]  text-[#5A5F6A]  hover:text-gray-500 text-left px-5 pt-5 pb-5"
                }
              >
                <p>
                  <i className="fa-solid fa-user-plus me-5"></i>
                  Register
                </p>
              </NavLink>
            </li>
          </ul>
        )}

        {/* Mobile navbar ends */}
      </div>

      {/* Medicine........menu........ ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-----------------------------*/}
      <div style={{ display: medicine || mediator ? "" : "none" }}>
        <button onClick={toggleSidebar}>
          <i className="fa-solid fa-bars text-xl text-primary relative top-[1px] left-[-5px]"></i>
        </button>
        {isSidebarOpen && (
          <div className=" overlay" onClick={toggleSidebar}>
            <div
              className={`sidebar w-[20%] z-50  relative top-[330px] ${
                isSidebarOpen ? "sidebar-visible" : ""
              }`}
            >
              {medicine && (
                <div className="text-left bg-neutral rounded-lg p-5 flex flex-col gap-y-4 w-[300px] z-50">
                  <div
                    className={`flex justify-between items-center px-3 ${
                      isActive("/medicine/cat/otc-medicine") ? "m_active" : ""
                    }`}
                  >
                    <Link
                      className="w-full text-left text-[17px] text text-custom"
                      to="/medicine/cat/otc-medicine"
                    >
                      <i className="fa-solid fa-pills mr-3"></i>OTC Medicine
                    </Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div
                    className={`flex justify-between items-center px-3 ${
                      isActive("/medicine/cat/women-choice") ? "m_active" : ""
                    }`}
                  >
                    <Link
                      className="w-full text-left text-[17px] text text-custom"
                      to="/medicine/cat/women-choice"
                    >
                      <i className="fa-solid fa-venus mr-3"></i>Women Choice
                    </Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div
                    className={`flex justify-between items-center px-3 ${
                      isActive("/medicine/cat/sexual-wellness")
                        ? "m_active"
                        : ""
                    }`}
                  >
                    <Link
                      className="w-full text-left text-[17px] text text-custom"
                      to="/medicine/cat/sexual-wellness"
                    >
                      <i className="fa-solid fa-person-pregnant mr-3"></i>Sexual
                      Wellness
                    </Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div
                    className={`flex justify-between items-center px-3 ${
                      isActive("/medicine/cat/diabetic-care") ? "m_active" : ""
                    }`}
                  >
                    <Link
                      className="w-full text-left text-[17px] text text-custom"
                      to="/medicine/cat/diabetic-care"
                    >
                      <i className="fa-solid fa-hospital-user mr-3"></i>Diabetic
                      Care
                    </Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div
                    className={`flex justify-between items-center px-3 ${
                      isActive("/medicine/cat/baby-care") ? "m_active" : ""
                    }`}
                  >
                    <Link
                      className="w-full text-left text-[17px] text text-custom"
                      to="/medicine/cat/baby-care"
                    >
                      <i className="fa-solid fa-baby mr-3"></i>Baby Care
                    </Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div
                    className={`flex justify-between items-center px-3 ${
                      isActive("/medicine/cat/dental-care") ? "m_active" : ""
                    }`}
                  >
                    <Link
                      className="w-full text-left text-[17px] text text-custom"
                      to="/medicine/cat/dental-care"
                    >
                      <i className="fa-solid fa-tooth mr-3"></i>Dental Care
                    </Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div
                    className={`flex justify-between items-center px-3 ${
                      isActive("/medicine/cat/personal-care") ? "m_active" : ""
                    }`}
                  >
                    <Link
                      className="w-full text-left text-[17px] text text-custom"
                      to="/medicine/cat/personal-care"
                    >
                      <i className="fa-solid fa-person-circle-check mr-3"></i>
                      Personal Care
                    </Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div
                    className={`flex justify-between items-center px-3 ${
                      isActive("/medicine/cat/prescription") ? "m_active" : ""
                    }`}
                  >
                    <Link
                      className="w-full text-left text-[17px] text text-custom"
                      to="/medicine/cat/prescription"
                    >
                      <i className="fa-solid fa-prescription mr-3"></i>
                      Prescription
                    </Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>
              )}
              {mediator && (
                <div className="text-left bg-neutral rounded-lg p-5 flex flex-col gap-y-4 w-[300px] z-50 absolute bottom-[-350px]">
                  {cat?.map((item) => (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center px-3 hover:text-primary${
                        isActive(`/mediator/${item?.category.name}`)
                          ? "bg-[#3cbd96] text-white rounded-[7px]"
                          : ""
                      }`}
                    >
                      <Link
                        className=" flex justify-start items-center gap-2 w-full text-left text-[17px] text text-custom"
                        to={`/mediator/${item?.category.name
                          .toLowerCase()
                          .split(" ")
                          .join("-")}`}
                      >
                        <img
                          className="h-6 w-6"
                          src={`${
                            import.meta.env.VITE_APP_BASE_URL
                          }/categories/${item?.category?.image}`}
                          alt={item?.category?.image}
                        />
                        <p>{item?.category?.name}</p>
                      </Link>
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className=" relative left-[-10px]">
        {" "}
        <NavLink
          to="/"
          onClick={closeParentDropdown}
          className={({ isActive }) =>
            isActive
              ? "text-[16px] text-primary font-bold text-left  cursor-pointer"
              : "text-[16px]  text-primary  hover:text-gray-500 text-left "
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </NavLink>
      </div>
      <div className=" relative left-[-4px]">
        <div className="indicator">
          <span className="indicator-item mt-[2px] text-primary font-bold">
            {" "}
            <p>{totalquantity > 0 ? totalquantity : ""}</p>
          </span>
          <div className="">
            <Cart position={"top"} />
          </div>
        </div>
      </div>
      <div className="">
        <ProfileSideBar
          position={"top"}
          photoURL={photoURL}
          handleLogOut={handleLogOut}
          displayName={displayName}
        />
      </div>
    </div>
  );
};

export default BottomBar;
