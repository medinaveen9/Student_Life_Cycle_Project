const express = require("express");
const router = express.Router();
const { streamFile } = require("../controllers/FileController");
const { verifyToken,authorizeRole } = require('../config/VerifyToken');

router.get("/view/:id", verifyToken,
    authorizeRole("Maker","Checker","Verifier"), streamFile);
module.exports = router;
