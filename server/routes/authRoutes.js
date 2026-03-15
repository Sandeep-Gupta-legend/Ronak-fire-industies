const express = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/login",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 characters"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  login
);

module.exports = router;
