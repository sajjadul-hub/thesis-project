import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PaymentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    tran_id: {
      type: String,
      required: true,
      unique: true,
    },

    mediator: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MediatorOrder",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    medicines: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MedicineOrder",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model("Payment", PaymentSchema);
