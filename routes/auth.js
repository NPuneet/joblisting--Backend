const express = require("express");
const router = express.Router();
const { logUser, registerUser } = require("../controllers/auth");

router.post("/login", logUser);
router.post("/register", registerUser);

module.exports = router;
