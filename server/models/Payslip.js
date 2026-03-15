const mongoose = require("mongoose");

const payslipSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },
    month: {
      type: String,
      required: true,
      trim: true,
    },
    grossSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    deduction: {
      type: Number,
      required: true,
      min: 0,
    },
    netPay: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

payslipSchema.index({ employeeId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Payslip", payslipSchema);
