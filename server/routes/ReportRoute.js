// routes.js
const express = require('express');
const router = express.Router();
const { generateReport, downloadExcel} = require('../controllers/ReportController');

router.post('/stipend_report', generateReport);
router.post('/stipend_excel', downloadExcel);

module.exports = router;
