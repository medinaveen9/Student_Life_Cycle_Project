const express = require('express');
const router = express.Router();
const multer = require("multer");

const { createCertificateRequest, uploadRequiredDocuments, fetchUploadedFiles,
  getFileById  } = require('../controllers/CertificateController');
const { get } = require('mongoose');

const upload = multer({ storage: multer.memoryStorage() });

// Route to fetch student information based on application number and course type
router.post('/request_form', createCertificateRequest);

router.post( "/upload/:responseId",
  upload.fields([ { name: "files" }, { name: "provfiles" },  { name: "duefiles" }, 
    { name: "feefiles" },  
  ]),
  uploadRequiredDocuments
);

router.get('/files', fetchUploadedFiles);
router.get('/file_id/:id', getFileById);

module.exports = router;