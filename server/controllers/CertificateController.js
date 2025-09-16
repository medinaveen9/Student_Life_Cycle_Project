const { CertificateService } = require('../services/CertificateService');
const { MongoClient, GridFSBucket, ObjectId  } = require('mongodb');

// Create certificate request
const createCertificateRequest = async (req, res) => {
    try {
        const data = req.body; 
        const certificate = await CertificateService(data);
        if(!certificate) {
            return res.status(400).json({ error: "Failed to create certificate request" });
        }
        return res.status(201).json({
            message: "Certificate request created successfully",
            certificate
        });
    } 
    catch (error) {
        console.error("Error creating certificate request:", error.message);
        res.status(500).json({ error: "Failed to create certificate request" });
    }
};

const uploadRequiredDocuments = async (req, res) => {
    try {
        const responseId = req.params.responseId;
        if (!responseId) {
            return res.status(400).json({ error: "Response ID is required" });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const db = client.db("Student_LifeCycle");
        const bucket = new GridFSBucket(db, { bucketName: "certificate_uploads" })
    
        for (const fieldName of Object.keys(req.files)) {
            const fileArray = req.files[fieldName]; // Each field has an array of files
            for (const file of fileArray) {
                const newFileName = `${Date.now()}-${file.originalname}`;

                const uploadStream = bucket.openUploadStream(newFileName, {
                    chunkSizeBytes: 255 * 1024,
                    metadata: {
                        form_id: responseId,
                        file_name: newFileName,
                        originalName: file.originalname,
                        contentType: file.mimetype,
                        certificate_type: req.body.certificate_type || "N/A",
                        fieldName: file.fieldname,
                    },
                });

                uploadStream.on("finish", () => {
                    console.log(`File saved with _id: ${uploadStream.id}`);
                });

                uploadStream.end(file.buffer);
            }
        }
        res.status(200).json({ message: "Files uploaded successfully!" });
    } catch (error) {
        console.error("Upload failed:", error);
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
        const filesCursor = bucket.find({ "metadata.form_id": responseId });
        const files = await filesCursor.toArray();
        if (files.length === 0) {
            return res.status(404).json({ error: "No files found for this response ID" });
        }
        const fileInfos = files.map(file => ({
            id: file._id,
            filename: file.filename,
            contentType: file.metadata.contentType,
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

        // fetch metadata to know contentType
        const fileDoc = await filesColl.findOne({ _id: oid });
        if (!fileDoc) {
        return res.status(404).json({ error: "File not found" });
        }

        const bucket = new GridFSBucket(db, { bucketName: "certificate_uploads" });

        // 👉 Set correct content type
        res.setHeader("Content-Type", fileDoc.contentType || "application/octet-stream");

        // 👉 Inline for preview in browser
        res.setHeader("Content-Disposition", `inline; filename="${fileDoc.filename}"`);

        const downloadStream = bucket.openDownloadStream(oid);
        downloadStream.on("error", (err) => {
        console.error("Error downloading file:", err);
        res.status(404).json({ error: "File not found" });
        });

        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error fetching file by ID:", error);
        res.status(500).json({ error: "Failed to fetch file" });
    }
};

module.exports = { createCertificateRequest, uploadRequiredDocuments, fetchUploadedFiles, getFileById };
