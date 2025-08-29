
const express = require("express");
const router = express.Router();
const { ReportFormController, getReportFormData } = require("../controllers/PgMedicalController");

router.post("/forms", async (req, res) => {
    await ReportFormController(req, res);
});


router.get("/forms", async (req, res) => {
    await getReportFormData(req, res);
});

module.exports = router;