import mongoose from "mongoose";

const notebookSchema = new mongoose.Schema(
  {
    client: {
      username: {
        type: String,
        required: [true, "Client username is required."],
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Client ID is required."],
      },
    },
    table: [
      {
        product: {
          type: String,
          required: [true, "Product name is required."],
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: [true, "Product price is required."] },
        date: { type: Date, default: Date.now },
        paid: { type: Boolean, default: false },
        paidDate: { type: Date },
      },
    ],
    total: { type: Number, default: 0 },
    prePayment: { type: Number, default: 0 },
    rest: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Helper function to process table and calculate fields
function processTable(table, context) {
  context.total = table.reduce((sum, item) => {
    return sum + (item.paid ? 0 : item.price);
  }, 0);

  table.forEach((item) => {
    if (item.paid && !item.paidDate) {
      item.paidDate = new Date();
      context.prePayment = (context.prePayment || 0) + item.price;
      context.total = (context.total || 0) - item.price;

      if (context.total < 0) {
        context.total = 0;
      }
    }
  });
  if (context.prePayment >= context.total) {
    return (context.rest = 0);
  }
  context.rest = (context.total || 0) - (context.prePayment || 0);
}

// Pre-save middleware
notebookSchema.pre("save", function (next) {
  processTable(this.table, this);
  next();
});

// Pre-findOneAndUpdate middleware
notebookSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  console.log("Update:", update);

  // Check if the update involves the table array
  if (update && update.$push && update.$push.table) {
    // Fetch the full document to get the complete table array
    const notebook = await this.model.findOne(this.getQuery());

    if (notebook) {
      // Add the new item(s) to the table array
      const newItems = Array.isArray(update.$push.table)
        ? update.$push.table
        : [update.$push.table];
      notebook.table.push(...newItems);

      // Recalculate the fields using the updated table
      processTable(notebook.table, notebook);

      // Update the fields in the update object
      this.setUpdate({
        $set: {
          table: notebook.table,
          total: notebook.total,
          prePayment: notebook.prePayment,
          rest: notebook.rest,
        },
      });
    }
  } else if (update && update.table) {
    // If the entire table is being updated, process it directly
    processTable(update.table, update);
    this.setUpdate(update);
  }

  next();
});

const Notebook = mongoose.model("Notebook", notebookSchema);
export default Notebook;
