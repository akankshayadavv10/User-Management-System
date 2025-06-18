const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your Full Name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Your email is required"],
  },
phone: {
    type: String,
    required: [true, "Your Phone is required"],
  },
alternate_phone: {
    type: String,
    required: [true, "Your Phone is required"],
  },
  dob:{
    type: Date,
    required: [true, "Your Date of Birth is required"],
  },

  gender:{
    type: String,
    required: [true,"Gender is required"],
    enum: ["Male","Female","Other"],
  },
  address: {
    type: String,
    required: [true, "Your Address is required"],
  },

  idproofurl:{
    type: String,
    required: [true, "Your ID Proof URL is required"],
  },
  addressproofurl:{
    type: String,
    required: [true, "Your Address Proof URL is required"],
  },  
  formurl:{
    type: String,
    required: [true, "Your Form URL is required"],
  },

  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("Member", memberSchema);