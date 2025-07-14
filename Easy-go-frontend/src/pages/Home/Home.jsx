import PageTitle from "../../utils/PageTitle";
import Banner from "./Banner";
import CostingCalculation from "./CostingCalculation/CostingCalculation";
import GPS from "./GPS";
import Poster from "./Poster";
import Review from "./Review";
import Services from "./Services";
import Specialties from "./Specialties";
import Travel from "./Travel";
import ExperienceCount from "./experienceCount";
const Home = () => {
  return (
    <div className="overflow-hidden">
      <PageTitle title="Home" />
      <div>
        <img
          className=" hidden lg:block"
          style={{
            height: "100vh",
            right: "0",
            position: "absolute",
            top: "0",
            zIndex: "10",
            width: "838px",
          }}
          alt="Group"
          src="https://cdn.animaapp.com/projects/650583aa310891ded91818c1/releases/6505842226ab18e0ca06cbfe/img/group-5@2x.png"
        />
        <img
          className=" hidden lg:block"
          style={{
            height: "80px",
            left: "685px",
            position: "absolute",
            top: "323px",
            width: "80px",
            zIndex: "10",
            opacity: "0.5",
          }}
          alt="Star four"
          src="https://cdn.animaapp.com/projects/650583aa310891ded91818c1/releases/6505842226ab18e0ca06cbfe/img/starfour-4@2x.png"
        />
      </div>
      <Banner category={"home"} />
      <ExperienceCount />
      <Travel />
      <Services />
      <Poster />
      <Specialties />
      <CostingCalculation />
      <GPS />
      <Review />
      {/* <BikeRent></BikeRent> */}
    </div>
  );
};

export default Home;
