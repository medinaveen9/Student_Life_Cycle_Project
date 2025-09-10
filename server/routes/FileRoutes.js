const express = require("express");
const router = express.Router();
const { streamFile } = require("../controllers/FileController");

router.get("/view/:id", streamFile);
module.exports = router;
