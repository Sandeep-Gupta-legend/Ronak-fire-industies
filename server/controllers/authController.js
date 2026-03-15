const { validationResult } = require("express-validator");
const Employee = require("../models/Employee");
const generateToken = require("../utils/generateToken");

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const employee = await Employee.findOne({ username }).select("+password");

    if (!employee) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await employee.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(employee);

    return res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        username: employee.username,
        name: employee.name,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login };
