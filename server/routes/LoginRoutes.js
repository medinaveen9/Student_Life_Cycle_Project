const express = require('express');
const router = express.Router();
const {verifyToken} = require("../config/VerifyToken")

const { userLogin,verifyUser, userLogout} = require("../controllers/LoginController")

router.post("/login", userLogin);
router.get("/verify", verifyToken, verifyUser);
router.get("/logout", userLogout);

module.exports = router;