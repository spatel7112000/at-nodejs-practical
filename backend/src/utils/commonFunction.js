const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../model/userModel");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Textlocal = require("textlocal-complete");
// const Textlocal = require('textlocal');

exports.createJwtToken = (payload) => {
  const access = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24hr",
  });
  const refresh = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  const access_token = `Bearer ${access}`;
  const refresh_token = `Bearer ${refresh}`;
  return { access_token, refresh_token };
};

exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.findUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email, is_deleted: false });
    return user;
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
};

exports.createJwtTokens = async (payload) => {
  const {
    JWT_USER_ACCESS_SECRET,
    JWT_USER_REFRESH_SECRET,
    JWT_NORMAL_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN,
  } = process.env;


  const access = jwt.sign(payload, JWT_USER_ACCESS_SECRET, {
    expiresIn: JWT_NORMAL_EXPIRES_IN,
  });
  const refresh = jwt.sign(payload, JWT_USER_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
  const access_token = `Bearer ${access}`;
  const refresh_token = `Bearer ${refresh}`;
  return { access_token, refresh_token };
};
