import express from "express";
import cors from "cors";
import { SslCommerzPayment } from "sslcommerz";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import routers from "./app/routers/index.js";
import { User } from "./app/modules/users/user.model.js";
import { Payment } from "./app/modules/payment/payment.model.js";
import { ObjectId } from "mongodb";
const app = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// access static file
app.use(express.static("src/uploads"));
app.use("/images", express.static("images"));
app.use("/categories", express.static("categories"));
app.use("/medicines", express.static("medicines"));
app.use("/blogs", express.static("blogs"));
app.use("/banners", express.static("banners"));

app.use("/api/v1/", routers);

app.get("/", (req, res) => {
  res.send("Welcome to test route");
});

app.post("/api/v1/payment", async (req, res) => {
  const transaction_Id = new ObjectId().toString();
  console.log(req.body);

  try {
    const result = await User.findById(req.body._id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Agent not found" });
    }

    const { name, email, address, phoneNumber } = req.body;

    const generateRandomRef = () => {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let ref = "";
      for (let i = 0; i < 6; i++) {
        ref += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return ref;
    };

    const data = {
      total_amount: 599,
      currency: "BDT",
      tran_id: transaction_Id,
      success_url: `${process.env.StoreRoute}/payment/success/${transaction_Id}`,
      fail_url: `${process.env.StoreRoute}/payment/fail/${transaction_Id}`,
      cancel_url: `${process.env.StoreRoute}/payment/cancel/${transaction_Id}`,
      cus_name: name,
      cus_email: email,
      cus_add1: address,
      shipping_method: "No",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_country: "Bangladesh",
      cus_phone: phoneNumber,
      multi_card_name: "mastercard",
      value_a: generateRandomRef(),
      value_b: generateRandomRef(),
      value_c: generateRandomRef(),
      value_d: generateRandomRef(),
    };

    const sslcommer = new SslCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASS,
      false
    );

    sslcommer
      .init(data)
      .then(async (apiResponse) => {
        const order = new Payment({
          name,
          email,
          address,
          phoneNumber,
          tran_id: transaction_Id,
          mediator: req.body.mediator,
          medicines: req.body.medicines,
          totalPrice: req.body.totalPrice,
          deliveryCharge: req.body.deliveryCharge,
          quantity: req.body.quantity,
          user: req.body._id,
        });
        await order.save();

        res
          .status(200)
          .json({ success: true, redirect: apiResponse.GatewayPageURL });
      })
      .catch((err) => {
        console.error("SSLCommerz error:", err);
        res.status(400).json({
          success: false,
          error: err.message || "Payment initialization failed",
        });
      });
  } catch (error) {
    console.error("Payment server error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Payment success route

app.post("/api/v1/payment/success/:transaction_Id", async (req, res) => {
  const { transaction_Id } = req.params; // ✅ Fix: Get from req.params
  console.log("🔔 Payment success called for transaction:", transaction_Id);

  try {
    // Step 1: Find the payment by transaction_Id
    const payment = await Payment.findOne({ tran_id: transaction_Id });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    console.log(payment);

    // Step 2: Find the user by email and name from payment
    const user = await User.findOne({
      name: payment.name,
      email: payment.email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or details do not match",
      });
    }

    // Step 3: Update user's payment status
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { paymentStatus: "Paid" } },
      { new: true }
    );

    console.log("✅ User payment status updated:", updatedUser);

    // Step 4: Redirect to success page
    res.redirect(`${process.env.DOMAINURL}/payment/success/${transaction_Id}`);
  } catch (error) {
    console.error("❌ Error in payment success route:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/v1/individual/:id", async (req, res) => {
  const booking = await Payment.findOne({
    tran_id: req.params.id,
  });
  console.log(req.params.id);

  try {
    res.status(200).json({
      status: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data can't fetch",
      error,
    });
  }
});

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Api Not Found",
      },
    ],
  });
  next();
});

export default app;
