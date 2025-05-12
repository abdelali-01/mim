import mongoose from "mongoose";

const notebookSchema = new mongoose.Schema(
  {
    client: {
      username: {
        type: String,
        required: [true, "Client username is required."],
      },
      phone: {
        type: String,
        required: [true, "Client phone number is required."],
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Client ID is required."],
      },
    },
    table: [
      {
        products: [
          {
            product: { type: String, required: [true, "Product name is required."] },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: [true, "Product price is required."] },
            image : {type : String}
          }
        ],
        date: { type: Date, default: Date.now },
        paid: { type: Boolean, default: false },
        paidDate: { type: Date },
        total: { type: Number, required: true },
        prePayment: { type: Number, default: 0 },
      }
    ],
    total : {type : Number , default : 0},
    prePayment : {type : Number , default : 0}
  },
  {
    timestamps: true,
  }
);

function calculateNotebookSummary(notebook) {
  const total = notebook.table.reduce((sum, entry) => sum + (entry.total || 0), 0);
  const prePayment = notebook.table.reduce((sum, entry) => sum + (entry.prePayment || 0), 0);

  notebook.total = total;
  notebook.prePayment = prePayment;
}


// Update paid & paidDate if necessary
function updatePaidStatus(notebook) {
  notebook.table = notebook.table.map((entry) => {
    const isPaid = (entry.prePayment || 0) >= entry.total;

    return {
      ...entry,
      paid: isPaid,
      paidDate: isPaid && !entry.paidDate ? new Date() : entry.paidDate,
    };
  });
}

// Pre-save middleware
notebookSchema.pre("save", function (next) {
  calculateNotebookSummary(this);
  updatePaidStatus(this);
  next();
});

// Pre-findOneAndUpdate middleware
notebookSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update && update.table) {
    calculateNotebookSummary(update);
    updatePaidStatus(update);
    this.setUpdate(update);
  }

  next();
});

const Notebook = mongoose.models.Notebook || mongoose.model("Notebook", notebookSchema);
export default Notebook;
