const stipendService = require('../services/StipendService');

exports.submitStipend = async (req, res) => {
  try {
     
    const saved = await stipendService.createStipend(req.body); 
    res.status(201).json({
      message: 'Stipend(s) saved successfully',
      data: saved,
    });
  } catch (err) {
    console.error('Error saving stipend:', err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.getAllStipends = async (req, res) => {
  try {
    const stipends = await stipendService.fetchAllStipends();
    res.json({ success: true, data: stipends });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};