import mongoose from "mongoose";

const trodatRegisterSchema = new mongoose.Schema(
  {
    date : {type: Date , default : Date.now} ,
    trodatSells : {type : Number , default : 0},
    total : {type : Number , default : 0},
    orders : [
      {
        destination : {type : String , required: [true , 'Destination field is required !']},
        phone : {type : String },
        email : {type : String , trim : true},
        model : {type : String , required : [true , 'The model is required fiels']},
        quantity : {type : Number , min : [1 , 'The quantity must be at least 1']},
        price : {type : Number , required:[true , 'The price is required fiels']},
        total : {type : Number},
        prePayment : {type : Number , default : 0},
        isCompleted : {type : Boolean , default : false},
        isDelivered : {type :Boolean , default : false},
      }
    ]
  },
  { timestamps: true }
);


trodatRegisterSchema.pre("save", function (next) {
  let totalSellCount = 0;
  let registerTotal = 0;

  this.orders.forEach((order) => {
    // Calculate item total
    order.total = order.quantity * order.price;

    // Add to register-level totals
    totalSellCount += order.quantity;
    registerTotal += order.prePayment;
  });

  this.trodatSells = totalSellCount;
  this.total = registerTotal;

  next();
});

const TrodatRegister =
  mongoose.models.TrodatRegister ||
  mongoose.model("TrodatRegister", trodatRegisterSchema);

export default TrodatRegister;