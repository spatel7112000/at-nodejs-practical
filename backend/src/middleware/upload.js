const multer = require("multer");
const path = require("path");
const { response_bad_request } = require("../utils/commonResponse");
const constants = require("../constants/constants");

// Store files in memory
const storage = multer.memoryStorage();

// Allowed file types
const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
  "video/mp4",
  "audio/mpeg",
  "audio/wav",
];

// File filter
const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"));
  }

  cb(null, true);
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

// Single file
exports.uploadSingle = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return response_bad_request(
          res,
          constants.FILE_UPLOAD_ERROR || "File upload failed",
          err.message
        );
      }

      next();
    });
  };
};

// Multiple files with same field
exports.uploadMultiple = (fieldName, maxCount = 10) => {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        return response_bad_request(
          res,
          constants.FILE_UPLOAD_ERROR || "File upload failed",
          err.message
        );
      }

      next();
    });
  };
};

// Multiple different fields
exports.uploadFields = (fields) => {
  return (req, res, next) => {
    upload.fields(fields)(req, res, (err) => {
      if (err) {
        return response_bad_request(
          res,
          constants.FILE_UPLOAD_ERROR || "File upload failed",
          err.message
        );
      }

      next();
    });
  };
};

// Accept any field/file
exports.uploadAny = () => {
  return (req, res, next) => {
    upload.any()(req, res, (err) => {
      if (err) {
        return response_bad_request(
          res,
          constants.FILE_UPLOAD_ERROR || "File upload failed",
          err.message
        );
      }

      next();
    });
  };
};