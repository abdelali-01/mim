import mongoose from "mongoose";

const tamponStockTable = mongoose.Schema({
  table: [
    {
      model: {
        type: String,
        required: [true, "The model is required field !"],
      },
      quantity: {
        type: Number,
        required: [true, "The quantity it`s required field"],
        min: [0, "A tampon model is out of the stock !"],
      },
      price: {
        type: Number,
        required: [true, "The price is required field "],
        min: [0, "The price must be larger then 0"],
      },
    },
  ],
  quantity: { type: Number },
});

tamponStockTable.pre("save", function (next) {
  if (this.table) {
    let totalQ = 0;
    this.table.forEach((item) => {
      totalQ += item.quantity;
    });

    this.quantity = totalQ;
  }
  next();
});

const TamponTable =
  mongoose.models.TamponTable ||
  mongoose.model("TamponTable", tamponStockTable);
export default TamponTable;
