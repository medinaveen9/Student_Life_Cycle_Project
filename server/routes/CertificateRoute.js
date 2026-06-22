const express = require('express');
const router = express.Router();
const multer = require("multer");
const { verifyToken,authorizeRole } = require('../config/VerifyToken');

const { createCertificateRequest, uploadRequiredDocuments, fetchUploadedFiles, getCertificatesDashboard,
  getFileById , updateStatus, getStudents, getDegreeName, PC_Certificate_Form, checkCertificateIssuedController } = require('../controllers/CertificateController');
const { get } = require('mongoose');

const upload = multer({ storage: multer.memoryStorage() });

router.post("/request_form", verifyToken, authorizeRole("Maker","Checker","Verifier"),
createCertificateRequest);
router.get("/dashboard",  verifyToken,  authorizeRole("Maker","Checker","Verifier"), getCertificatesDashboard);
router.get("/files",  verifyToken,  authorizeRole("Maker","Checker","Verifier"), fetchUploadedFiles);
router.post("/verification",verifyToken,authorizeRole("Maker","Checker","Verifier"), updateStatus);

//Master certcificate Routes
router.get("/student_info", verifyToken, authorizeRole("Maker","Checker","Verifier"),getStudents);
router.get("/dds_code", verifyToken, authorizeRole("Maker","Checker","Verifier"), getDegreeName);
router.post("/provisional", verifyToken,authorizeRole("Checker", "Verifier"), upload.fields([
    { name: "studentImage" }, ]), PC_Certificate_Form );

router.get("/check_issued", verifyToken, authorizeRole("Maker","Checker","Verifier"), checkCertificateIssuedController);


// Upload certificate files
router.post("/upload/:responseId",verifyToken,authorizeRole("Maker","Checker","Verifier"),
  upload.fields([
    { name: "Required Certificates" }, { name: "Provisional Certificate" }, { name: "No Due" }, { name: "Fee Receipt" }, ]),
  uploadRequiredDocuments
);

router.get('/file_id/:id', verifyToken, authorizeRole("Maker","Checker","Verifier"),getFileById);

module.exports = router; 