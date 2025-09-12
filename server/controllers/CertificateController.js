const { CertificateService } = require('../services/CertificateService');
const { MongoClient, GridFSBucket } = require('mongodb');

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
                    certificate_type: req.body.certificate_type || "N/A"
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

module.exports = { createCertificateRequest, uploadRequiredDocuments };
