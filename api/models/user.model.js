import mongoose from "mongoose";

const userSchema = new mongoose.Schema({  // Changed from 'mongoose.model' to 'mongoose.Schema'
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // Corrected the schema definition

const User = mongoose.model('User', userSchema);

export default User;
