const Employee = require("../models/Employee");
const KYC = require("../models/KYC");
const Salary = require("../models/Salary");
const Payslip = require("../models/Payslip");

const getProfile = async (req, res, next) => {
  try {
    const profile = await Employee.findById(req.employee._id).select("-password");
    return res.status(200).json(profile);
  } catch (error) {
    return next(error);
  }
};

const getKYC = async (req, res, next) => {
  try {
    const kyc = await KYC.findOne({ employeeId: req.employee._id });
    if (!kyc) {
      return res.status(404).json({ message: "KYC details not found" });
    }

    return res.status(200).json(kyc);
  } catch (error) {
    return next(error);
  }
};

const getSalary = async (req, res, next) => {
  try {
    const salary = await Salary.findOne({ employeeId: req.employee._id });
    if (!salary) {
      return res.status(404).json({ message: "Salary details not found" });
    }

    return res.status(200).json(salary);
  } catch (error) {
    return next(error);
  }
};

const getPayslip = async (req, res, next) => {
  try {
    const payslips = await Payslip.find({ employeeId: req.employee._id }).sort({ month: -1 });
    return res.status(200).json(payslips);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  getKYC,
  getSalary,
  getPayslip,
};
