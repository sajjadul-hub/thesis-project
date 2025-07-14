const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <i
          className="fa fa-check-circle text-5xl text-green-600 mb-4"
          aria-hidden="true"
        ></i>
        <h1 className="text-2xl font-semibold text-green-600 mb-4">Success!</h1>
        <p className="text-gray-700">
          Your booking with Easy Go Parcel Delivery has been placed
          successfully.
        </p>
        <p className="text-gray-700 mt-2">
          Thank you for choosing Easy Go for your parcel delivery needs.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
