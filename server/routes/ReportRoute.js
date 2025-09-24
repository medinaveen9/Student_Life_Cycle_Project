// routes.js
const express = require('express');
const router = express.Router();
const { generateReport } = require('../controllers/ReportController');

router.post('/stipend_report', generateReport);

module.exports = router;
