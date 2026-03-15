const express = require("express");
const {
  getProfile,
  getKYC,
  getSalary,
  getPayslip,
} = require("../controllers/employeeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/kyc", protect, getKYC);
router.get("/salary", protect, getSalary);
router.get("/payslip", protect, getPayslip);

module.exports = router;
