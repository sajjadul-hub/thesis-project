import { Link, Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../../hooks/ScrollToTop";
import Navbar from "../../components/Navbar/Navbar";
import BottomBar from "../../components/MobileBottomBar/BottomBar";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../pages/Services/Medicine/MedicineHome/Loader";
import { useEffect } from "react";
import { getMediatorCategory } from "../../features/mediator/serviceApi";
const MediatorLayout = () => {
  const location = useLocation();

  const { mediatorCategory } = useSelector((state) => state.mediator);

  const dispatch = useDispatch();
  useEffect(() => {
    getMediatorCategory(dispatch);
  }, [dispatch]);

  const isActive = (path) => {
    return location.pathname === path;
  };
  let pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const pageTitle =
    pathSegments.length > 0
      ? pathSegments[pathSegments.length - 1]
      : "Mediator";

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
                <Link to="/mediator">Mediator</Link>
              </li>
              <li>{pageTitle}</li>
            </ul>
          </div>
          <div className="text-left bg-slate-50 rounded-lg p-5 flex flex-col gap-y-4">
            {mediatorCategory ? (
              mediatorCategory?.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: isActive(
                      `/mediator/${item?.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`
                    )
                      ? "#3cbd96 "
                      : "",
                    borderRadius: isActive(
                      `/mediator/${item?.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`
                    )
                      ? "7px"
                      : "",
                  }}
                  className={`flex justify-between items-center px-3 hover:text-primary`}
                >
                  <Link
                    className=" flex justify-start items-center gap-2 w-full text-left text-[17px] text text-custom"
                    to={`/mediator/${item?.name
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                  >
                    <img
                      className="h-6 w-6"
                      src={`${import.meta.env.VITE_APP_BASE_URL}/categories/${
                        item?.image
                      }`}
                      // src={item?.category?.image}
                      alt={item?.category?.image}
                    />
                    <p
                      style={{
                        color: isActive(
                          `/mediator/${item?.name
                            .toLowerCase()
                            .split(" ")
                            .join("-")}`
                        )
                          ? "white"
                          : "",
                      }}
                    >
                      {item?.name}
                    </p>
                  </Link>
                  <i
                    style={{
                      color: isActive(
                        `/mediator/${item?.name
                          .toLowerCase()
                          .split(" ")
                          .join("-")}`
                      )
                        ? "white"
                        : "",
                    }}
                    className="fa-solid fa-chevron-right"
                  ></i>
                </div>
              ))
            ) : (
              <div>
                <Loader />
                <Loader />
              </div>
            )}
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

export default MediatorLayout;
