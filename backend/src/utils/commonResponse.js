const constants = require("../constants/constants");

exports.successMessage = (res, message, data) => {
  const resData = {
    error: false,
    statusCode: constants.SUCCESS,
    message: message,
    data,
  };

  return res.status(resData.statusCode).json(resData);
};

exports.internal_server_error = (res, errors = {}) => {
  const resData = {
    error: true,
    statusCode: constants.SERVER_ERROR,
    message: constants.INTERNAL_SERVER_ERROR,
    errors: errors,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.data_not_found = (res, value) => {
  const resData = {
    error: false,
    statusCode: constants.NOT_FOUND,
    message: constants.NOT_FOUND_MESSAGE(value),
    data: [],
  };
  return res.status(resData.statusCode).json(resData);
};

exports.unauthorize = (res, message) => {
  const resData = {
    error: true,
    statusCode: constants.UNAUTHORIZED,
    message: message,
    data: [],
  };
  return res.status(resData.statusCode).json(resData);
};

exports.response_ok = (res, message, data) => {
  const resData = {
    error: false,
    statusCode: constants.SUCCESS,
    message: message,
    data: data,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.response_created = (res, message, data) => {
  const resData = {
    error: false,
    statusCode: constants.CREATED,
    message: message,
    data,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.response_bad_request = (res, message, data) => {
  const resData = {
    error: true,
    statusCode: constants.BAD_REQUEST,
    message: message,
    data: data,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.response_forbidden = (res, message, data) => {
  const resData = {
    error: true,
    statusCode: constants.FORBIDDEN,
    message: message,
    data: data,
  };
  return res.status(resData.statusCode).json(resData);
};

exports.custom_error_response = (res, statusCode, message, errors = {}) => {
  const resData = {
    error: true,
    statusCode: statusCode,
    message: message,
    errors: errors,
  };
  return res.status(resData.statusCode).json(resData);
};