
const { ReportFormDetails, ReportFormData } = require("../services/PgMedicalService");


const ReportFormController = async (req, res) => {
  try {
    const tableName = req.body.tableName;
    const formData = req.body.formData;

    if (!tableName || !formData) {
      return res.status(400).json({ error: "Missing tableName or formData" });
    }

    const inserted = await ReportFormDetails(formData, tableName);
    res.json({ success: true, id: inserted.id });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getReportFormData = async (req, res) => {
  try {
    const tableName = req.query.tableName;
    if (!tableName) return res.status(400).json({ error: "Missing tableName" });

    const rows = await ReportFormData(tableName);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { ReportFormController, getReportFormData };
