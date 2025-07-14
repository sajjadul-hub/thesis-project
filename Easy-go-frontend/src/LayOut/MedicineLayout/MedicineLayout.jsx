import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./MedicineLayout.css";
// import { useState } from "react";
import ScrollToTop from "../../hooks/ScrollToTop";
import BottomBar from "../../components/MobileBottomBar/BottomBar";

const MedicineLayout = () => {
  const location = useLocation();
  const isActive = (path) => {
    console.log(path);
    return location.pathname === path;
  };
  let pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const pageTitle =
    pathSegments.length > 0
      ? pathSegments[pathSegments.length - 1]
      : "Medicine";

  return (
    <ScrollToTop>
      <Navbar />
      {/* Drawer Open Button */}
      <div className="flex flex-row-reverse mt-3">
        <div style={{}} className="content md:w-[80%] w-full">
          <Outlet />
        </div>
        <div className="sidebar w-[20%] md:block hidden z-50 fixed left-0 top-[155px]">
          <div className="text-black font-semibold breadcrumbs ml-[2rem]">
            <ul>
              <li>
                <Link to="/medicine">Medicine</Link>
              </li>
              <li>{pageTitle}</li>
            </ul>
          </div>
          <div className="text-left bg-neutral rounded-lg p-5 flex flex-col gap-y-4">
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
                isActive("/medicine/cat/sexual-wellness") ? "m_active" : ""
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
                <i className="fa-solid fa-hospital-user mr-3"></i>Diabetic Care
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
        </div>
        {/* Sidebar. In larger device's block and median device's hidden */}
      </div>
      <div className="lg:hidden">
        <BottomBar />
      </div>
      <Footer />
    </ScrollToTop>
  );
};

export default MedicineLayout;
