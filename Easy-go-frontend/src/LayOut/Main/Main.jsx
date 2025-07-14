import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../hooks/ScrollToTop";
import BottomBar from "../../components/MobileBottomBar/BottomBar";

const Main = () => {
  const location = useLocation();
  const loc = location.pathname.split("/")[1];

  const excludeRoute = ["login", "registration"];

  return (
    <ScrollToTop>
      {!excludeRoute.includes(loc) && <Navbar />}
      <Outlet />
      {!excludeRoute.includes(loc) && <Footer />}
      <div className="lg:hidden ">
        {!excludeRoute.includes(loc) && <BottomBar />}
      </div>
    </ScrollToTop>
  );
};

export default Main;
