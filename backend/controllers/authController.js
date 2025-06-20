const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        message: "user already exist,please login",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel({
      name,
      email,
      password: hassedPassword,
    });
    const saveUser = await newUser.save();
    return res.status(201).json({
      message: "user registered",
      success: true,
      data: saveUser,
    });
  } catch (error) {
    console.log("error in signup controller");
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {}
};

module.exports = { signupController, loginController };
