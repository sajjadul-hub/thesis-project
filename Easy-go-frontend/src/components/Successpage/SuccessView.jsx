import Lottie from "react-lottie-player";
import lottieJson from "./Animation - 1700050737029.json";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoBase64 from "../../assets/Logo/logoBG.png";
import { FaCheckCircle, FaDownload } from "react-icons/fa";
const SuccessView = () => {
  const location = useLocation();

  const trans_id = location.pathname.split("/")[3];

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/individual/${trans_id}`
        );
        if (response.data.status) {
          setBookingData(response.data.data);
        } else {
          setError("Failed to fetch booking data");
        }
      } catch (err) {
        setError("Error fetching booking data");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [trans_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const handleDownload = () => {
    const doc = new jsPDF();

    // Title and Header Section
    doc.addImage(logoBase64, "PNG", 10, 10, 30, 10);

    doc.setFillColor(0, 150, 0);
    doc.rect(160, 10, 35, 10, "F"); // Green box for Paid status
    doc.setTextColor(255, 255, 255); // White text for "PAID"
    doc.text("PAID", 170, 17);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: ${booking?.value_c}`, 160, 30); // Order ID
    doc.text(`Order Date :`, 160, 35); // Purchase date
    doc.text(`${formatDate(booking.createdAt)}`, 160, 40); // Purchase date

    // Company Info Section
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Pro-BSulider", 10, 50);
    doc.text("Level 4, 34, Awal Centre, Banani, Dhaka", 10, 55);
    doc.text("probulider@gmail.com", 10, 60);
    doc.text("0132230882", 10, 65);

    doc.setFontSize(12);
    doc.text(`${booking?.cus_name}`, 160, 56);
    doc.text(`${booking?.cus_email}`, 160, 60);
    doc.text(`${booking?.cus_phone}`, 160, 65);

    // Payment Method Section
    doc.setFontSize(12);
    doc.setFillColor(240, 240, 240); // Light gray background
    doc.rect(10, 70, 190, 10, "F"); // Background box for payment details
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Method", 10, 75);
    doc.text("Payment Info #", 160, 75);

    doc.setFontSize(10);
    doc.text("bkash", 10, 85); // Payment method
    doc.text(`${booking?.cus_phone}`, 160, 85); // Payment phone
    doc.text(`${booking?.value_a}`, 160, 90); // Payment reference

    // Itemized Breakdown Section
    const headers = [["Item", "Price"]];
    const rows = [
      ["Pro-Bulider Agent Register fee", `${booking?.total_amount}TK`], // Example item
    ];

    doc.autoTable({
      startY: 100,
      head: headers,
      body: rows,
      theme: "grid",
    });

    // Summary Section

    // Save PDF
    doc.save("invoice.pdf");
  };

  const booking = bookingData;
  function formatDate(dateString) {
    if (!dateString) return ""; // Handle case where date is undefined

    const date = new Date(dateString);

    // Format the date part (e.g., "Aug 30, 2023")
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Format the time part (e.g., "7.58PM")
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // to get AM/PM format
    });

    return `${formattedDate} at ${formattedTime}`;
  }

  return (
    <div className="lg:flex  mt-4 my-10  justify-center items-center gap-8 lg:mx-52  mx-3   ">
      <div className=" payment-success-container">
        <div className=" p-4">
          <div className="flex justify-center">
            <Lottie
              loop
              color="#0ca39a"
              animationData={lottieJson}
              play
              className="w-[90px] lg:w-[90px] my-3 text-center"
            />
          </div>

          <div className="text-center ">
            <h3 className="md:text-xl text-base text-gray-900 text-center">
              Payment Successful!
            </h3>
            <div className="payment-header border-b-[1px] border-gray-400 border-dashed pb-1">
              <p>Thank you for completing your secure online payment.</p>
            </div>

            <div className=" text-left mt-5">
              <p className="  flex flex-col">
                <span className=" text-gray-400"> Transaction ID</span>
                <span className="text-sm font-semibold pt-1 pb-4">
                  {booking?.tran_id}
                </span>
              </p>
              <span className="text-gray-400">Status</span>
              <div className="payment-status">
                <span className="status-icon">
                  <FaCheckCircle />
                </span>
                <span className="status-text">Successful</span>
              </div>
              <div className="flex justify-between items-center">
                <p className=" flex flex-col">
                  <span className="text-gray-400">Name</span>
                  <span className="text-sm font-semibold pt-1 pb-4">
                    {booking?.name}
                  </span>
                </p>
                <p className=" flex flex-col">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-sm font-semibold pt-1 pb-4">
                    {booking?.totalPrice}TK
                  </span>
                </p>
              </div>
              <p className="flex flex-col">
                <span className="text-gray-400">Date</span>
                <span className="text-sm font-semibold pt-1 pb-4">
                  {formatDate(booking?.createdAt)}
                </span>
              </p>
            </div>

            <div className="mt-[-10px]  text-center">
              <div className="flex justify-between">
                <Link to="/order" className=" back-button">
                  GO BACK
                </Link>

                <button onClick={handleDownload} className="invoice-button">
                  <FaDownload />
                  Invoice Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;
