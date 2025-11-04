const express = require('express');
const router = express.Router();
const multer = require("multer");
const { verifyToken } = require('../config/VerifyToken');

const { createCertificateRequest, uploadRequiredDocuments, fetchUploadedFiles, getCertificatesDashboard,
  getFileById , updateStatus } = require('../controllers/CertificateController');
const { get } = require('mongoose');

const upload = multer({ storage: multer.memoryStorage() });

router.post("/request_form", verifyToken, createCertificateRequest);
router.get("/dashboard",  verifyToken, getCertificatesDashboard);
router.get("/files",  verifyToken, fetchUploadedFiles);
router.post("/verification",  verifyToken, updateStatus);

// Upload certificate files
router.post("/upload/:responseId",
  upload.fields([
    { name: "Required Certificates" }, { name: "Provisional Certificate" }, { name: "No Due" }, { name: "Fee Receipt" }, ]),
  uploadRequiredDocuments
);

router.get('/files', fetchUploadedFiles);
router.get('/file_id/:id', getFileById);

module.exports = router;