import mongoose from "mongoose";

const serviceProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
  },
  description: {
    type: String,
    max: [500, "Description is too long , max 500 characters"],
    trim: true,
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
  },
  servicePrice: {
    from: { type: Number, required: [true, "Service price is required"] },
    to: { type: Number, required: [true, "Service price is required"] },
  },
  images: {
    type: [String],
    required: [true, "Product images are required"],
  },
  files: {
    type: [String],
    required: [true, "Product files are required"],
  },
});

const ServiceProduct = mongoose.model("ServiceProduct", serviceProductSchema);
export default ServiceProduct;
