import video from "../../assets/video/video.mp4";

const Travel = () => {
  return (
    <div>
      <div className="bg-[#E3F9E7] lg:w-[18%] w-[50%] rounded-lg mt-[-4px] mx-auto text-center uppercase py-4 relative z-10">
        <p className="text-[#204945] text-md lg:text-2xl text-md  font-bold">
          About Us
        </p>
      </div>
      <div className="bg-[#2D3F2A] flex lg:justify-center lg:flex-row flex-col-reverse items-center gap-24 py-16 px-16 mx-[-40px] mt-[-20px] relative">
        <div>
          <video
            width="640"
            height="360"
            controls
            autoPlay
            loop
            muted
            className="rounded"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className=" text-center lg:text-left ">
          <h1 className="text-[#FFFFFF] text-4xl font-bold ">Easy Go</h1>
          <p className=" text-[#E0DCDC] mt-6">
            Elevating Your Everyday: Our Daily Service Company <br />
            Delivers Convenience and Quality to Your Doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Travel;
