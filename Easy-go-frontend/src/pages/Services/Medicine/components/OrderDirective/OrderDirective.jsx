const OrderDirective = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between mx-[20px]">
      <div className="w-full md:w-[50%]">
        <h1 className="text-3xl font-bold">How to order medicine?</h1>
        <ol className="text-custom p-5" style={{ listStyleType: "decimal" }}>
          <li>Upload prescription image or search and buy medicine.</li>
          <li>
            Our pharmacist will verify the prescription you provided and call
            you to confirm the order.
          </li>
          <li>Get your delivery within 12-24 hours.</li>
        </ol>
      </div>
      <div className="w-full md:w-[50%]">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/4YeOvXTqpCU?si=Y5MB84O17IvYQAip"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default OrderDirective;
