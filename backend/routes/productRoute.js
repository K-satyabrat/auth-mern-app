const express = require("express");
const ensureAuthenticated = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.get("/",  (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 12000,
    },
    {
      name: "laptop",
      price: 50000,
    },
  ]);
});

module.exports = productRouter;
