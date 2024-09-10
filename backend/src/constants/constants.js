const HTTP_STATUSES = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  PAYLOAD_LARGE: 413,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const FUNCTIONS = {
  NOT_FOUND_MESSAGE: (name) => `${name} not found`,
  ALREADY_EXIST: (name) => `${name} already exist`,
  NOT_EXIST: (name) => `${name} does not exist`,
  ALREADY_REGISTERED: (name) => `This ${name} already registered please login`,
  UPDATED_SUCCESSFULLY: (name) => `${name} updated successfully`,
  PROFILE_MESSAGE: (text) => `${text} profile fetched successfully`,
  FAILED_MESSAGE: (text) => `Failed to ${text}`,
  RESET_PASSWORD_MESSAGE_TYPE: (text) => `Password reset ${text} sent successfully`,
};

const API_MESSAGES = {
  REGISTER_MESSAGE: "You are Registered successfully",
  LOGIN_MESSAGE: "You are logged in successfully",
  FORGOT_PASSWORD_MESSAGE: "Verification link sent successfully",
  RESET_PASSWORD_LINK_MESSAGE: "Password reset link sent successfully",
  RESET_PASSWORD_MESSAGE: "Password Reset Successfully",
  ACCOUNT_VERIFIED_MESSAGE: "Account Verified Successfully",
  CHANGE_PASSWORD_MESSAGE: "Password Changed Successfully",
  VALID_TOKEN: "Token is Validated Successfully",
  VALIDATE_CONTENT: "Content validation successful",
  LOGOUT_MESSAGE: "Logged out successfully",
  REFRESH_TOKEN_SUCCESS: "Refresh token generated successfully",
};

const ERRORS = {
  TOKEN_NOT_EXIST_ERROR:
  "The user belonging to this token does no longer exist.",
  TOKEN_EXPIRED_ERROR: "Your token has expired. Please log in again!",
  INTERNAL_SERVER_ERROR: "An unexpected error occurred. Please try again later.",
};

const MESSAGES = {
  EMAIL_ALREADY_EXIST: "Email is already in use",
  DATABASE_CONNECTED: "Database connection was established",
  DATABASE_CONNECTION_ERROR: "Failed to connect to database",
  PASSWORD_WRONG: "Your current password is wrong",
  NEW_PASSWORD_SAME_AS_OLD: "Your current password and new password are the same, please change new password",
  INCORRECT_CREDENTIALS: "Incorrect credentials",
  CURRENT_NEW_PASSWORD_DIFFERENT:
    "Current password and new password should not be the same",
};

module.exports = {
  ...HTTP_STATUSES,
  ...FUNCTIONS,
  ...MESSAGES,
  ...API_MESSAGES,
  ...ERRORS,
};
