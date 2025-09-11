const{ pool} = require("../models/db");

exports.getAllChecker = async (req, res) => {
  try {
      const result = await pool.query("SELECT * FROM certificate_requests ORDER BY id ASC");
   res.json(result.rows);  
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateApproverStatus = async (req, res) => {
  const { comment, status } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE certificate_requests  SET approver_comments = $1, approver_status = $2
       WHERE id = $3  RETURNING *`,
      [comment, status, id]  
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating certificate request:", error);
    res.status(500).json({ error: "Failed to update certificate request" });
  }
};

exports.updateCheckerStatus = async (req, res) => {
  const { comment, status } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE certificate_requests  SET checker_comments = $1,   checker_status = $2 
       WHERE id = $3 RETURNING *`,
      [comment, status, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating checker status:", error);
    res.status(500).json({ error: "Failed to update checker status" });
  }
};
