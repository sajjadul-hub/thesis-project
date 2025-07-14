import ContactForm from "../../components/Form/ContactForm";
import wave from "../../assets/images/wave.png";
import bg from "../../assets/images/bg.svg";
import PageTitle from "../../utils/PageTitle";
const Contact = () => {
  const Title = {
    fontSize: "40px",
    textAlign: "center",
    marginTop: "60px",
    color: "#38d39f",
  };

  return (
    <div
      style={{ backgroundImage: `url(${wave}`, backgroundRepeat: "no-repeat" }}
    >
      <PageTitle title="Contact" />
      <h1 style={Title}>Contact Us</h1>
      <div className="lg:grid grid-cols-12 mt-12 lg:mx-10  rounded-xl  mx-2 ">
        <div className=" col-span-6 ">
          <img src={bg} alt="" srcSet="" />
        </div>
        <div className=" flex items-center justify-center col-span-6 lg:mr-[20px]">
          <div className="divider lg:flex hidden"></div>
          <div className="w-full bg-white p-5">
            <p className="md:text-3xl text-xl font-bold leading-7 text-center text-[#38d39f]">
              Send Us a Message
            </p>
            <ContactForm></ContactForm>
          </div>
        </div>
      </div>
      {/* <div className="lg:mx-10 mx-2  flex justify-between">
        <div></div>
        <iframe
          className="w-[40%] h-96 rounded card-bordered"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1847.171139092693!2d92.21923687243037!3d22.18909496969414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad6b38cb492611%3A0xf2bbfa416823b43b!2sHotel%20Green%20land%20Bandarban!5e0!3m2!1sen!2sbd!4v1680503113790!5m2!1sen!2sbd"
        ></iframe>
      </div> */}
    </div>
  );
};

export default Contact;
