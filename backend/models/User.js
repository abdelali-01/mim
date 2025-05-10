import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required field !"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required field !"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required field !"],
      unique: true,
    },
    password : {
        type : String ,
        required : [true , 'You have to put a password !'],
    },
    isAdmin : {
        type : Boolean ,
        default :false 
    },
    role : {
        type : String ,
    }
  },
  { timestamps: true }
);

// Add this method to your User schema
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
