const mongoose = require("mongoose");
require("dotenv").config();
const constants = require("../constants/constants");
mongoose.set("strictQuery", false);
const config = mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(constants.DATABASE_CONNECTED);
  })
  .catch((err) => {
    console.log(constants.DATABASE_CONNECTION_ERROR, err);
  });
