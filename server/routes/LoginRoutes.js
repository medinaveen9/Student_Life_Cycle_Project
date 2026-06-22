const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {verifyToken} = require("../config/VerifyToken")

const { userLogin,verifyUser, userLogout, changePassword, forgotPasswordController,resetPasswordController , 
    registerController} = require("../controllers/LoginController")

// Rate limiter for login endpoint
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 10,                     // max 10 attempts per 15 minutes
    message: {
        error: "Too many login attempts. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/login", loginRateLimiter, userLogin);
router.get("/verify", verifyToken, verifyUser);
router.get("/logout", userLogout);
router.post("/change-password",verifyToken, changePassword);
router.post("/forgot-password",loginRateLimiter, forgotPasswordController);
router.post("/reset-password",loginRateLimiter, resetPasswordController);
router.post("/register", registerController);

module.exports = router;