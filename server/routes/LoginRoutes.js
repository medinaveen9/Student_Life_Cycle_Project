const express = require('express');
const router = express.Router();
const {verifyToken} = require("../config/VerifyToken")

const { userLogin,verifyUser, userLogout, changePassword, forgotPasswordController,
    resetPasswordController 
 } = require("../controllers/LoginController")

router.post("/login", userLogin);
router.get("/verify", verifyToken, verifyUser);
router.get("/logout", userLogout);
router.post("/change-password", changePassword);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

module.exports = router;