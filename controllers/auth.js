const authSchema = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const registerUser = async (req, res, next) => {
  try {
    let { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "credentials missing" });
    }
    const isExistingUser = await authSchema.findOne({ email: email });
    if (isExistingUser) {
      res.status(409).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new authSchema({
      email,
      name,
      password: hashedPassword,
    });
    await userData.save();
    res.status(200).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};

const logUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "credentials missing" });
    }
    const isExistingUser = await authSchema.findOne({ email: email });
    if (!isExistingUser) {
      res.status(409).json({ message: "user does not exists" });
    }

    const matchPassword = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!matchPassword) {
      return res.status(401).json({ errmessage: "invalid credintials" });
    }
    const token = jwt.sign({ id: isExistingUser._id }, process.env.SECRET_KEY);
    res.status(200).json({
      message: "user logged in",
      name: isExistingUser.name,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logUser,
  registerUser,
};
