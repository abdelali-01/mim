import mongoose from "mongoose";

const cashRegisterSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    default: 0,
  },
  f_total: {
    type: Number,
    default: 0,
  },
  t_total: {
    type: Number,
    default: 0,
  },
  removed: [
    {
      note: { type: String, required: [true, "the note field it`s required"] },
      some: {
        type: Number,
        required: [true, "the removed price it`s required"],
      },
    },
  ],
  items: [
    {
      title: { type: String, required: [true, "Product title it`s required"] },
      category: {
        type: String,
        required: [true, "You have to select a category"],
        enum: ["T", "F"],
      },
      price: {
        type: Number,
        required: [true, "Are you kidding me , Put the price man !!"],
      },
    },
  ],
});

cashRegisterSchema.pre("save", function (next) {
  const doc = this;

  let tTotal = 0;
  let fTotal = 0;

  doc.items.forEach((item) => {
    if (item.category === "T") {
      tTotal += item.price;
    } else if (item.category === "F") {
      fTotal += item.price;
    }
  });

  const removedTotal = doc.removed?.reduce((sum, r) => sum + r.some, 0) || 0;

  doc.t_total = tTotal;
  doc.f_total = fTotal;
  doc.total = tTotal + fTotal - removedTotal;

  next();
});

const CashRegister =
  mongoose.models.CashRegister ||
  mongoose.model("CashRegister", cashRegisterSchema);
export default CashRegister;
