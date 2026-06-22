// routes.js
const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../config/VerifyToken');
const { generateReport, downloadExcel} = require('../controllers/ReportController');


const reportRoles = [ "Checker","Dean",  "Approver","FA","FC"];
router.post('/stipend_report', verifyToken, authorizeRole(...reportRoles), generateReport);
router.post('/stipend_excel', verifyToken, authorizeRole(...reportRoles), downloadExcel);

module.exports = router;

