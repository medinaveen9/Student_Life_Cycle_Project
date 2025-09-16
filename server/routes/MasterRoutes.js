const { MongoClient, GridFSBucket } = require('mongodb');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const { getAllUploadedFiles, streamFile } = require("../controllers/UploadsController");
// const verifyToken = require("../middleware/auth"); // uncomment when you have token middleware
const {administration, personal, contact, education, payment, getCourseName,
  fetchAdministration,fetchPersonal, employeeRoleController } = require("../controllers/MasterController");

const uri = process.env.MONGO_URI;

// Use memory storage to get the file buffer
const upload = multer({ storage: multer.memoryStorage() });
router.post("/administrative_information", administration)
router.post("/personal_information", personal);
router.post("/contact_details", contact);
router.post("/educational_details", education);
router.post("/payment_details", payment);
router.get("/course_name", getCourseName);

router.get("/administrative_information",fetchAdministration);
router.get("/personal_information", fetchPersonal);
router.post("/employee_role", employeeRoleController);
// File upload route
router.post('/research', upload.any(), async (req, res) => {
  try {
    const client = new MongoClient(uri);
    client.connect().then(() => console.log('MongoDB connected!'));
    const db = client.db('Student_LifeCycle');
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    // const formId = req.body.formID;
const applicationNo = req.body.application_no;

    for (const file of req.files) {
      const idMatch = file.fieldname.match(/file_(\d+)/);
      if (!idMatch) continue;

      const labelId = idMatch[1];
      const labelName = req.body[`label_name_${labelId}`];

      const timestamp = Date.now();
      const newFileName = `${timestamp}-${file.originalname}`;

      const uploadStream = bucket.openUploadStream(newFileName, {
        chunkSizeBytes: 255 * 1024,
        metadata: {
          file_name: newFileName,
          originalName: file.originalname,
          contentType: file.mimetype,
          // form_id: formId,
            application_no: applicationNo, 
          label_id: labelId,
          label_name: labelName
        },
      });

      uploadStream.on('finish', () => {
        console.log(`File saved with _id: ${uploadStream.id}`);
      });

      uploadStream.end(file.buffer);
    }

    res.status(200).send('Files uploaded successfully!');
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).send('Upload failed');
  }
});

// File routes
// router.get("/files", verifyToken, getAllUploadedFiles); // add back when verifyToken is ready

router.get("/files", getAllUploadedFiles);
router.get('/files/view/:id', streamFile);

module.exports = router;
