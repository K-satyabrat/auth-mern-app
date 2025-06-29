const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      success: true,
      message: "user registered",
      data: saveUser,
    });
  } catch (error) {
    console.log("error in signup controller");
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(409).json({
        success: false,
        message: "auth failed, user or email is wrong",
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, existUser.password);
    if (!isPasswordEqual) {
      return res.status(409).json({
        success: false,
        message: "auth failed, user or email is wrong",
      });
    }
    const jwtToken = jwt.sign(
      { email: existUser.email, _id: existUser._id },
      process.env.JWT_SECRETE,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "login successfull",
       jwtToken,
       email,
       name:existUser.name
    });
  } catch (error) {
    console.log("error in login controller");
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = { signupController, loginController };
