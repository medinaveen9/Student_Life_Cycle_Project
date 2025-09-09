const express = require('express');
const router = express.Router();
const multer = require("multer");

const { createCertificateRequest, uploadRequiredDocuments } = require('../controllers/CertificateController');

const upload = multer({ storage: multer.memoryStorage() });

// Route to fetch student information based on application number and course type
router.post('/request_form', createCertificateRequest);
router.post("/upload/:responseId", upload.array("files"), uploadRequiredDocuments);

module.exports = router;