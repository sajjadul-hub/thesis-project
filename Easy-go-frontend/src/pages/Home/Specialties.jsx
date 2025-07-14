const Specialties = () => {
  return (
    <div className="mb-24  mx-10">
      <div className="bg-[#E3F9E7]  mx-[-40px] py-10">
        <div className=" flex justify-between">
          <div></div>
        </div>

        <div className="lg:flex justify-center items-center gap-24">
          <h1 className=" uppercaselg:py-0 py-5 text-center lg:text-left text-3xl uppercase font-bold">
            Our Specialties
          </h1>
          <p className="text-lg font-semibold text-[15px] text-[#777E90] text-center lg:text-left">
            Unlocking Convenience, Delivering Care: –<br /> Our Specialties,
            Your Solutions.
          </p>
        </div>

        <div className="lg:px-20 px-2 lg:mx-0 flex justify-center items-center lg:gap-2 gap-7 lg:justify-around flex-col lg:flex-row mt-12">
          <div className="lg:w-[30%] lg:h-[210px] px-7 border-[1px] rounded-xl   bg-white flex gap-5 py-8 shadow-xl">
            <div className="text-[#C1EADD] lg:text-4xl text-5xl font-bold">
              <h1>01</h1>
            </div>
            <div>
              <h1 className="lg:text-xl text-2xl font-bold ">Easy to order</h1>
              <p className="hidden lg:block text-sm text-[#777E90] my-3">
                Simplicity in a click. Discover seamless shopping with our
                user-friendly platform. Experience easy ordering and have your
                desired items delivered swiftly. Your convenience, our priority.
              </p>
              <p className="lg:hidden lg:text-sm text-[#777E90] lg:my-3">
                Enjoy a simple and fast ordering process with no hassle.
              </p>
            </div>
          </div>

          <div className=" lg:w-[30%] lg:h-[210px] px-7 border-[1px] rounded-xl   bg-white flex gap-5 py-8 shadow-xl">
            <div className="text-[#C1EADD] lg:text-4xl text-5xl font-bold">
              <h1>02</h1>
            </div>
            <div>
              <h1 className=" lg:text-xl text-2xl font-bold ">
                Cash on delivery
              </h1>
              <p className="text-[#777E90] hidden lg:block  lg:text-sm  lg:my-3">
                Stacks is a production-ready library of stackable content blocks
                built in React Native
              </p>
              <p className="lg:hidden text-[#777E90] lg:text-sm  lg:my-3">
                No need to pay until you receive your order safely and securely.
              </p>
            </div>
          </div>

          <div className="lg:w-[30%] lg:h-[210px] px-7 border-[1px] rounded-xl   bg-white flex gap-5  py-8 shadow-xl">
            <div className="text-[#C1EADD] text-5xl lg:text-4xl font-bold">
              <h1>03</h1>
            </div>
            <div>
              <h1 className="lg:text-xl text-2xl font-bold ">Live tracking</h1>
              <p className="hidden lg:block  text-[#777E90] text-sm my-3">
                Stacks is a production-ready library of stackable content blocks
                built in React Native
              </p>
              <p className="lg:hidden  text-[#777E90]  ">
                Live tracing gives you peace of mind and transparency for your
                order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialties;
