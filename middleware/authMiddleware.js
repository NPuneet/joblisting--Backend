const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const job = require("../models/job");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ");
    if (!token && token.length < 2) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    const decode = jwt.verify(token[1], process.env.SECRET_KEY);
    const validUser = job.findById(decode.id);
    if (!validUser) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "invalid token" });
  }
};
module.exports = verifyToken;
