// const stipendService = require('../services/StipendService');

const { getStudentDetails, insertStipendDetails ,fetchAllStipends, studentLeaveService,
   stipendApprovalStatus, stipendBulkApproval, addCourseStipend} = require('../services/StipendService');

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
    const { rollNo, name, course, accountNo, joiningDate, leavesBalance, presentAndHolidays, requested_leaves,  
      stipend, actualStipend, cur_month, ifsc_code, year, total_leaves} = req.body;
    const {id, isEdit, userId, userRole, user_name, isModified} = req.query;

    if (!rollNo || !name || !course || !accountNo || !joiningDate) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    await insertStipendDetails({id, isEdit, userId, userRole, user_name, cur_month, ifsc_code, year, requested_leaves,
      rollNo, name, course, accountNo, joiningDate, leavesBalance, presentAndHolidays, stipend, 
      actualStipend, total_leaves, isModified});
    return res.status(201).json({ success: true, message: 'Stipend details submitted successfully' });
  } catch (err) {
    console.error('Error submitting stipend:', err.message);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getAllStipends = async (req, res) => {
  try {
    const role = req.query.role; // e.g., 'Checker', 'Verifier', 'Approver'
    const month = req.query.month; // e.g., '2023-09'
    const {course, year, roll_no} = req.query;
    const data = await fetchAllStipends(role, month, course, year, roll_no); // call service
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching stipends in controller:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

//stipend approval status update
const stipendApprovalController = async (req, res) => {
  try {
    const { id, status, role, userInfo } = req.query;
    if (!id || !status || !role) {
      return res.status(400).json({ success: false, error: 'Missing required query parameters' });
    }
    const isUpdated = await stipendApprovalStatus(id, status, role, userInfo);
    if (isUpdated) {
      return res.json({ success: true, message: 'Stipend status updated successfully' });
    } else {
      return res.status(404).json({ success: false, error: 'Stipend record not found' });
    }
  } catch (err) {
    console.error('Error updating stipend status:', err.message);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

const stipendBulkApprovalController = async (req, res) => {
  try {
    const { ids, role, userInfo } = req.body;
    const status = 'approved'; 
    const isUpdated = await stipendBulkApproval(ids, status, role, userInfo);
    if (isUpdated) {
      return res.json({ success: true, message: 'Bulk stipend status updated successfully' });
    } else {
      return res.status(400).json({ success: false, error: 'Invalid role or no records updated' });
    }
  } catch (err) {
    console.error('Error in bulk stipend approval:', err.message);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// add course stipend
const addCourseStipendController = async (req, res) => {
  try {
    const data = req.body;
    const {userId, user_name} = req.query;
    data.userId = userId;
    data.user_name = user_name;
    const result = await addCourseStipend(data);
    if (result) {
      return res.status(201).json({ success: true, message: 'Course stipend added successfully' });
    }
    return res.status(400).json({ success: false, error: 'Failed to add course stipend' });
  } catch (err) {
    console.error('Error adding course stipend:', err.message);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }   
};

const addOrUpdateStudentLeave = async (req, res) => {
  try {
    const data = req.body;
    const result = await studentLeaveService(data);
    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong!" });
  }
};

module.exports = { getStudentInfo, submitStipend,getAllStipends, stipendApprovalController,
   stipendBulkApprovalController, addCourseStipendController, addOrUpdateStudentLeave};