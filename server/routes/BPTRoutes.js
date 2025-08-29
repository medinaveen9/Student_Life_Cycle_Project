// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const {courseSelectionController} = require("../controllers/BPTController");

router.post("/course-selection", courseSelectionController);

module.exports = router;
