const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const userSignup = joi.object().keys({
  name: joi.string().custom((value, helpers) => {
    if (value.match(/[a-z]/) && value.match(/[A-Z]/)) {
      return value;
    }
    return helpers.message(
      "First name must contain at least one uppercase and one lowercase letter"
    );
  }, "First name validation"),
  last_name: joi.string().custom((value, helpers) => {
    if (value.match(/[a-z]/) && value.match(/[A-Z]/)) {
      return value;
    }
    return helpers.message(
      "Last name must contain at least one uppercase and one lowercase letter"
    );
  }, "Last name validation"),
  email: joi.string().trim().email().required().label("Email"),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(6)
    .required(),
    id: joi.string().optional().allow("").label("Id"),
});

const login = joi.object().keys({
  email: joi.string().trim().email().required().label("Email"),
  password: joi.string().required().label("Password"),
});

const editUserProfile = joi.object().keys({
  name: joi.string().custom((value, helpers) => {
    if (value.match(/[a-z]/) && value.match(/[A-Z]/)) {
      return value;
    }
    return helpers.message(
      "First name must contain at least one uppercase and one lowercase letter"
    );
  }, "First name validation"),
  last_name: joi.string().custom((value, helpers) => {
    if (value.match(/[a-z]/) && value.match(/[A-Z]/)) {
      return value;
    }
    return helpers.message(
      "Last name must contain at least one uppercase and one lowercase letter"
    );
  }, "Last name validation"),
  email: joi.string().trim().email().required().label("Email"),
  id: joi.string().optional().label("Id"),
});

module.exports = {
  login,
  editUserProfile,
  userSignup
};
