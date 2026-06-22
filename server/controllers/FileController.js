const { ObjectId, GridFSBucket } = require("mongodb");
const { connectToMongo, getDB } = require("../models/db");

exports.streamFile = async (req, res) => {
  try {
    const formId = req.params.id; // Postgres UUID
    const project_type = req.query.name?.trim() || "certificate";

    if (!formId) {
      return res.status(400).json({ error: "Form ID is required" });
    }

    await connectToMongo();
    const db = getDB();
    let bucket, fileDoc;

    if (project_type === "certificate") {
      bucket = new GridFSBucket(db, { bucketName: "certificate_uploads" });
      fileDoc = await db
        .collection("certificate_uploads.files")
        .findOne({ "metadata.form_id": formId ,
              // "metadata.userId": req.user.userId
        }); 
    }

    if (!fileDoc) {
      return res.status(404).json({ error: "File not found for this form_id" });
    }

    res.set({
      "Content-Type": fileDoc.metadata?.contentType || "application/pdf",
      "Content-Disposition": `inline; filename="${
        fileDoc.metadata?.originalName || fileDoc.filename
      }"`,
    });

    bucket.openDownloadStream(fileDoc._id).pipe(res); 
  } catch (error) {
    console.error("Error streaming file:", error);
    res.status(500).json({ error: "Error streaming file" });
  }
};
