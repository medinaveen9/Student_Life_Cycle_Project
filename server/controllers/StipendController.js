// const stipendService = require('../services/StipendService');
const { getStudentDetails, insertStipendDetails ,fetchAllStipends } = require('../services/StipendService');

// exports.submitStipend = async (req, res) => {
//   try {
     
//     const saved = await stipendService.createStipend(req.body); 
//     res.status(201).json({
//       message: 'Stipend(s) saved successfully',
//       data: saved,
//     });
//   } catch (err) {
//     console.error('Error saving stipend:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// };
// exports.getAllStipends = async (req, res) => {
//   try {
//     const stipends = await stipendService.fetchAllStipends();
//     res.json({ success: true, data: stipends });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

const getStudentInfo = async (req, res) => {
  try {
    const { application_no } = req.query;
    if (!application_no) {
      return res.status(400).json({ error: 'application_no query parameter is required' });
    }
    const student = await getStudentDetails(application_no);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    console.error('Error fetching student details:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const submitStipend = async (req, res) => {
  try {
    const { rollNo, name, course, accountNo, joiningDate, leavesBalance, presentAndHolidays, stipend } = req.body;

    if (!rollNo || !name || !course || !accountNo || !joiningDate) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    await insertStipendDetails({
      rollNo, name, course, accountNo, joiningDate, leavesBalance, presentAndHolidays, stipend, });
    return res.status(201).json({ success: true, message: 'Stipend details submitted successfully' });
  } catch (err) {
    console.error('Error submitting stipend:', err.message);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getAllStipends = async (req, res) => {
  try {
    const data = await fetchAllStipends(); // call service
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching stipends in controller:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { getStudentInfo, submitStipend,getAllStipends };