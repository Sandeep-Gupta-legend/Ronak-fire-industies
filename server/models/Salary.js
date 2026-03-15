const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
      index: true,
    },
    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    hra: {
      type: Number,
      required: true,
      min: 0,
    },
    allowances: {
      type: Number,
      required: true,
      min: 0,
    },
    bonus: {
      type: Number,
      required: true,
      min: 0,
    },
    deductions: {
      type: Number,
      required: true,
      min: 0,
    },
    pf: {
      type: Number,
      required: true,
      min: 0,
    },
    netSalary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Salary", salarySchema);
