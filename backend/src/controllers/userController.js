const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createJwtTokens,
  catchAsync,
  findUserByEmail,
} = require("../utils/commonFunction");
const constants = require("../constants/constants");
const {
  internal_server_error,
  data_not_found,
  unauthorize,
  response_ok,
  response_created,
  response_bad_request,
  response_forbidden,
} = require("../utils/commonResponse");

//#region register user
exports.register_user = catchAsync(async (req, res) => {
  let { name, last_name, email, password } = req.body;
  const model = require("../model/userModel");
  const existUser = await findUserByEmail(email);
  if (existUser) {
    return response_ok(
      res,
      constants.ALREADY_REGISTERED(constants.USER),
      existUser
    );
  } else {
    const data = new model({
      name,
      last_name,
      email,
      password,
    });
    let result = await data.save();
    if (result) {
      return response_created(res, constants.REGISTER_MESSAGE, result);
    } else {
      return response_bad_request(
        res,
        constants.FAILED_MESSAGE("create an account"),
        []
      );
    }
  }
});
//#endregion

//#region login
exports.login = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  email = email ? email.toLowerCase() : "";
  const existUser = await findUserByEmail(email);
  if (existUser && existUser._id) {
    const validPassword = await bcrypt.compare(password, existUser.password);
    if (validPassword) {
      const payload = { userId: existUser._id };
      const { access_token, refresh_token } = await createJwtTokens(
        payload
      );
      // Save refresh token to user (you should store this securely)
      existUser.refresh_token = refresh_token;
      await existUser.save();
      return response_ok(res, constants.LOGIN_MESSAGE, {
        access_token,
        ...existUser._doc,
      });
    } else {
      return unauthorize(res, constants.INCORRECT_CREDENTIALS);
    }
  } else {
    return data_not_found(res, "User");
  }
});
//#endregion

//#region edit profile
exports.edit_profile = catchAsync(async (req, res) => {
  const { name, last_name, email } = req.body;
  const model = require("../model/userModel");
  const find_profile = await model.findById({
    _id: req.user_id,
    is_deleted: false,
  });
  const emailExists = await model.findOne({
    email: email, // Find by the new email
    _id: { $ne: req.user_id }, // Exclude the current user's ID
    is_deleted: false,
  });
  if (find_profile) {
    if (emailExists) {
      return response_bad_request(
        res,
        constants.EMAIL_ALREADY_EXIST,
        []
      );
    }
      const update_profile = await model.findByIdAndUpdate(
        { _id: find_profile._id },
        {
          $set: {
            name,
            last_name,
            email,
          },
        },
        { new: true }
      );
      if (update_profile) {
        return response_ok(
          res,
          constants.UPDATED_SUCCESSFULLY("Profile"),
          update_profile
        );
      } else {
        return response_bad_request(
          res,
          constants.FAILED_MESSAGE("update profile"),
          []
        );
      }
  } else {
    return data_not_found(res, "User");
  }
});
//#endregion

//#region change password
exports.change_password = catchAsync(async (req, res) => {
  const { current_password, new_password } = req.body;
  const model = require("../model/userModel");
  // Find the user
  const user = await model.findById({ _id: req.user_id, is_deleted: false });
  if (!user) {
    return data_not_found(res, "User");
  }

  // Check current password
  const isMatch = await bcrypt.compare(current_password, user.password);
  if (!isMatch) {
    return unauthorize(res, constants.PASSWORD_WRONG);
  }
  if (isMatch) {
    return bad_request(res, constants.NEW_PASSWORD_SAME_AS_OLD);
  }
  // Update the user's password
  user.password = new_password;
  await user.save();
  return response_ok(res, constants.RESET_PASSWORD_MESSAGE, user);
});
//#endregion

//#region refresh token
exports.refresh_token = catchAsync(async (req, res) => {
  const { refresh_token } = req.body;
  const model = require("../model/userModel");

  // Verify the refresh token
  jwt.verify(
    refresh_token,
    process.env.JWT_USER_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) {
        return response_forbidden(res, constants.TOKEN_EXPIRED_ERROR, []);
      }

      try {
        // Find the user associated with the refresh token
        const user = await model.findById({
          _id: decoded.userId,
          is_deleted: false,
        });

        if (!user || !user.refresh_token === refresh_token) {
          return response_forbidden(res, constants.TOKEN_NOT_EXIST_ERROR, []);
        }

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "24hr",
          }
        );

        return response_ok(res, constants.REFRESH_TOKEN_SUCCESS, {
          access_token: newAccessToken,
        });
      } catch (error) {
        console.error("Error during refresh token process:", error);
        return internal_server_error(
          res,
          constants.INTERNAL_SERVER_ERROR,
          error.message
        );
      }
    }
  );
});
//#endregion

//#region get user infor
exports.get_profile = catchAsync(async (req, res) => {
  const model = require("../model/userModel");
  const find_profile = await model.findById({
    _id: req.user_id,
    is_deleted: false,
  });
  if (find_profile) {
    return response_ok(
      res,
      constants.PROFILE_MESSAGE(constants.USER),
      find_profile
    );
  } else {
    return data_not_found(res, "User");
  }
});
//#endregion
