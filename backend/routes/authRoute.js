const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidation");
const {
  signupController,
  loginController,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", signupValidation, signupController);
authRouter.post("/login", loginValidation, loginController);

module.exports = authRouter;
