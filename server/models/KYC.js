const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
      index: true,
    },
    aadhaarNumber: {
      type: String,
      required: true,
    },
    panNumber: {
      type: String,
      required: true,
      uppercase: true,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
      uppercase: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    uanNumber: {
      type: String,
      required: true,
    },
    pfNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("KYC", kycSchema);
