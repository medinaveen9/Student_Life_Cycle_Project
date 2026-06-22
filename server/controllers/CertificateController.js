const { CertificateService, getAllCertificates, updateVerificationStatus, 
    getStudentsByRollNo, getDegreeNameByCourseCode, createPCCertificateRequest,
checkCertificateIssued, generatePDF } = require('../services/CertificateService');
const { MongoClient, GridFSBucket, ObjectId  } = require('mongodb');
const { v4: uuidv4 } = require("uuid");


// Create certificate request
const createCertificateRequest = async (req, res) => {
    try {
        const { roll_no, name, department, course_name, certificate_type, certificate_details } = req.body;

        if (!roll_no || !certificate_type) {
        return res.status(400).json({ error: "Roll number and certificate type are required" });
        }

        const certificate_id = await CertificateService({
            roll_no, name, department, course_name, certificate_type, data: certificate_details,
        });

        res.status(201).json({ message: "Certificate request created successfully", certificate_id });
    } catch (err) {
        console.error("Error creating certificate request:", err);
        res.status(500).json({ error: "Failed to create certificate request" });
    }
};

// Upload files to MongoDB GridFS
const uploadRequiredDocuments = async (req, res) => {
    try {
        const responseId = req.params.responseId;
        if (!responseId) return res.status(400).json({ error: "Response ID is required" });
        if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ error: "No files uploaded" });

        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const db = client.db("Student_LifeCycle");
        const bucket = new GridFSBucket(db, { bucketName: "certificate_uploads" });

        for (const fieldName of Object.keys(req.files)) {
            const fileArray = req.files[fieldName];
            for (const file of fileArray) {
                const newFileName = `${Date.now()}-${file.originalname}`;
                const uploadStream = bucket.openUploadStream(newFileName, {
                chunkSizeBytes: 255 * 1024,
                contentType: file.mimetype,
                metadata: {
                    certificate_id: responseId,
                    originalName: file.originalname,
                    fieldName: file.fieldname,
                    certificate_type: req.body.certificate_type || "N/A",
                },
                });
                uploadStream.end(file.buffer);
            }
        }

        res.status(200).json({ message: "Files uploaded successfully!" });
    } catch (err) {
        console.error("Upload failed:", err);
        res.status(500).json({ error: "Upload failed" });
    }
};

// Fetch uploaded files by response ID
const fetchUploadedFiles = async (req, res) => {
    try {
        const responseId = req.query.id;   
        if (!responseId) {
            return res.status(400).json({ error: "Response ID is required" });
        }
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const db = client.db("Student_LifeCycle");
        const bucket = new GridFSBucket(db, { bucketName: "certificate_uploads" });
        const filesCursor = bucket.find({ "metadata.certificate_id": responseId });
        const files = await filesCursor.toArray();
        if (files.length === 0) {
            return res.status(200).json([]);
        }
        const fileInfos = files.map(file => ({
            id: file._id,
            filename: file.filename,
            originalName: file.metadata.originalName,   
            uploadDate: file.uploadDate,
            certificate_type: file.metadata.certificate_type,
            fieldName: file.metadata.fieldName,
        }));
        res.status(200).json(fileInfos);
    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ error: "Failed to fetch files" });
    }
};

const getFileById = async (req, res) => {
  try {
    const fileId = req.params.id;
    const oid = new ObjectId(fileId);

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("Student_LifeCycle");
    const filesColl = db.collection("certificate_uploads.files");

    const fileDoc = await filesColl.findOne({ _id: oid });
    if (!fileDoc) {
      return res.status(404).json({ error: "File not found" });
    }

    const bucket = new GridFSBucket(db, { bucketName: "certificate_uploads" });
    const contentType = fileDoc.contentType || "application/octet-stream";

    // ✅ Correct MIME type for browser
    res.setHeader("Content-Type", contentType);

    // ✅ Inline means open in tab, not download
    res.setHeader("Content-Disposition", `inline; filename="${fileDoc.filename}"`);

    // ✅ Allow browser rendering
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

    const downloadStream = bucket.openDownloadStream(oid);

    downloadStream.on("error", (err) => {
      console.error("Error streaming file:", err);
      res.status(404).json({ error: "File not found" });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    res.status(500).json({ error: "Failed to fetch file" });
  }
};



// Fetch Certificates
const getCertificatesDashboard = async (req, res) => {
    try {
        const userData = req.user; // Assuming user data is attached to req object
        const certificates = await getAllCertificates(userData);
        res.status(200).json(certificates);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { request_id, certificate_id, status, answers } = req.body;
        // const user = req.user || req.body.user;
      const user = req.user;
        // use null/undefined checks so values like false or 0 are accepted
        if (request_id == null || certificate_id == null || status == null) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const updated = await updateVerificationStatus(
            request_id, certificate_id, status, answers, user
        );

        if (!updated) {
            return res.status(404).json({ error: "Certificate not found!" });
        }

        return res.json({ message: "Status updated successfully!", data: updated });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Failed to update status!" });
    }
};

//Fetch student details by roll number
const getStudents = async (req, res) => {
    try {
        const rollNo = req.query.roll_no;
        if (!rollNo) {
            return res.status(400).json({ error: "Roll number is required" });
        }
        const students = await getStudentsByRollNo(rollNo);
        if(!students) {
            return res.status(404).json({ message: "No student found with the given roll number" });
        }
        res.status(200).json(students);
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ error: err.message });
    }
};

const getDegreeName = async (req, res) => {
    try {
        const courseCode = req.query.dds_code;   
        if (!courseCode) {
            return res.status(400).json({ message: "Course code is required" });
        }
        const degree = await getDegreeNameByCourseCode(courseCode);
        if(!degree) {
            return res.status(404).json({ message: "No data found for given course code" });
        }
        res.status(200).json(degree);
    } catch (err) {
        console.error("Error fetching degree name:", err);
        res.status(500).json({ message: err.message });
    }
};

const PC_Certificate_Form = async (req, res) => {
    try {
        const responseId = uuidv4();
        const formData = req.body;
        const files = req.files || {};
        const userData = req.user;

        const studentImage = files.studentImage?.[0] || null;

        const result = await createPCCertificateRequest(
            responseId, formData, req.files, userData );

        result.gender = formData.gender;
        result.academic_section = formData.academic_section;
        result.hall_ticket = formData.hall_ticket;

        // 👇 If image exists, convert to Base64
        if (studentImage) {
            const base64Image = studentImage.buffer.toString("base64");
            result.photoDataURL = `data:${studentImage.mimetype};base64,${base64Image}`;
        } else {
            result.photoDataURL = null;
        }

        const pdfBuffer = await generatePDF(result);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=certificate_${responseId}.pdf`,
        });

        return res.send(pdfBuffer);
    } catch (err) {
        console.error("PC certificate upload failure", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Check if certificate already issued
const checkCertificateIssuedController = async (req, res) => {
    try {
        const { roll_no } = req.query;
        const allTypes = ['Degree', 'Marks Memo', 'Provisional Certificate', 'Final Certificate'];
        const { issuedCertificates, notIssuedCertificates } = await checkCertificateIssued(roll_no, allTypes);

        res.status(200).json({
            issuedCertificates, notIssuedCertificates });
    } catch (err) {
        console.error("Error checking issued certificates:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createCertificateRequest, uploadRequiredDocuments, fetchUploadedFiles, 
    getFileById, getCertificatesDashboard, updateStatus, getStudents, getDegreeName, 
    PC_Certificate_Form, checkCertificateIssuedController };
