const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const { userAuth } = require("../middleware/auth");
const validator = require("../middleware/validators");
// Public routes (no authentication required)
router.post("/register", validator('userSignup'), user_controller.register_user);
router.post("/login", validator('login'), user_controller.login);
router.post("/refresh_token", user_controller.refresh_token);

// Protected routes (authentication required)
router.use(userAuth); // Apply userAuth middleware to the routes below

router.get("/get_profile", user_controller.get_profile);
router.post("/change_password", user_controller.change_password);
router.put("/edit_profile", validator('editUserProfile'), user_controller.edit_profile);

module.exports = router;
