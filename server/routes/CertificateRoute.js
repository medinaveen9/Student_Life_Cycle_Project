const express = require('express');
const router = express.Router();
const multer = require("multer");
const { verifyToken } = require('../config/VerifyToken');

const { createCertificateRequest, uploadRequiredDocuments, fetchUploadedFiles, getCertificatesDashboard,
  getFileById , updateStatus, getStudents, getDegreeName, PC_Certificate_Form, checkCertificateIssuedController } = require('../controllers/CertificateController');
const { get } = require('mongoose');

const upload = multer({ storage: multer.memoryStorage() });

router.post("/request_form", verifyToken, createCertificateRequest);
router.get("/dashboard",  verifyToken, getCertificatesDashboard);
router.get("/files",  verifyToken, fetchUploadedFiles);
router.post("/verification",  verifyToken, updateStatus);

//Master certcificate Routes
router.get("/student_info", verifyToken, getStudents);
router.get("/dds_code", verifyToken, getDegreeName);
router.post("/provisional", verifyToken, upload.fields([
    { name: "studentImage" }, ]), PC_Certificate_Form );

router.get("/check_issued", verifyToken, checkCertificateIssuedController);


// Upload certificate files
router.post("/upload/:responseId",
  upload.fields([
    { name: "Required Certificates" }, { name: "Provisional Certificate" }, { name: "No Due" }, { name: "Fee Receipt" }, ]),
  uploadRequiredDocuments
);

router.get('/file_id/:id', getFileById);

module.exports = router;