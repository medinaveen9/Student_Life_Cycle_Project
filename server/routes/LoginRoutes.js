const express = require('express');
const router = express.Router();
const {verifyToken} = require("../config/VerifyToken")

const { userLogin,verifyUser} = require("../controllers/LoginController")

router.post("/login", userLogin);
router.get("/verify", verifyToken, verifyUser);

module.exports = router;