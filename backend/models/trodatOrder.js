import mongoose from "mongoose";

const trodatOrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
      },
      username: { type: String, required: [true, "User name is required"] },
    },
    name: {
      type: String,
      required: [true, "Name of the tampon is required"],
    },
    trodat: {
      type: String,
      required: [true, "Trodat name is required"],
    },
    files: [
      {
        documentName: {
          type: String,
          required: [true, "Document name is required"],
        },
        document: { type: String, required: [true, "Document is required"] },
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    prePayment: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paidDate: {
      type: Date,
    },
    livraison: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "in progress", "completed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

trodatOrderSchema.pre("save", (next) => {
  if (this.prePayment === this.peice) {
    this.paid = true;
    this.paidDate = new Date();
  }

  if (this.paid && !this.paidDate) {
    this.paidDate = new Date();
    this.prePayment = (this.prePayment || 0) + this.price;
  }
  next();
});

const TrodatOrder = mongoose.model("TrodatOrder", trodatOrderSchema);
export default TrodatOrder;
