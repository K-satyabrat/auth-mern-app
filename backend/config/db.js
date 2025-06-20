const mongoose = require("mongoose");
require('dotenv').config()

const connectDb = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("please provide Mongo_Uri in .env file");
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error("db error",error.message)
  }
};

module.exports= connectDb