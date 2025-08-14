const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Connect if not already connected
let db, bucket;
async function init() {
  if (!db) {
    await client.connect();
    db = client.db("NIMS_Forms");
    bucket = new GridFSBucket(db, { bucketName: "uploads" });
  }
}

// List all uploaded files
async function getAllUploadedFiles(req, res) {
  try {
    await init();
    const files = await db.collection("uploads.files").find().toArray();
    res.json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).send("Failed to fetch files");
  }
}

// Stream a file by ID
async function streamFile(req, res) {
  try {
    await init();
    const fileId = new ObjectId(req.params.id);

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(404).send("File not found");
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error streaming file:", err);
    res.status(500).send("Failed to stream file");
  }
}

module.exports = { getAllUploadedFiles, streamFile };
