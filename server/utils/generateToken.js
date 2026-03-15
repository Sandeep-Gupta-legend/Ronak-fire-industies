const jwt = require("jsonwebtoken");

const generateToken = (employee) => {
  return jwt.sign(
    {
      id: employee._id,
      username: employee.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = generateToken;
