// const stipendService = require('../services/StipendService');

const { getStudentDetails, insertStipendDetails ,fetchAllStipends, studentLeaveService, deleteStipendData,
   stipendApprovalStatus, stipendBulkApproval, addCourseStipend, autoFillStipendData,
  promoteStudentsService , addStudentService, fetchStudentsByFilter, deleteStudent, 
  addOrUpdateStudentService, deleteStudentStipendById, updateLeavesAndPresent } = require('../services/StipendService');

  // Get student info by application number
const getStudentInfo = async (req, res) => {
  try {
    const { application_no, selectedMonth } = req.query;
    if (!application_no) {
      return res.status(400).json({ error: 'application_no query parameter is required' });
    }
    const student = await getStudentDetails(application_no, selectedMonth);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    console.error('Error fetching student details:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Submit stipend details
const submitStipend = async (req, res) => {
  try {
    const { rollNo, name, course, accountNo, joiningDate, leavesBalance, presentAndHolidays, requested_leaves,  
      stipend, actualStipend, cur_month, ifsc_code, year, total_leaves, available_leaves} = req.body;
    const {id, isEdit, userId, userRole, user_name, isModified} = req.query;

    if (!rollNo || !name || !course || !accountNo || !joiningDate) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    await insertStipendDetails({id, isEdit, userId, userRole, user_name, cur_month, ifsc_code, year, requested_leaves,
      rollNo, name, course, accountNo, joiningDate, leavesBalance, presentAndHolidays, stipend, 
      actualStipend, total_leaves, available_leaves, isModified});
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

const autoFillStipends = async (req, res) => {
  try {
    const { course, month, userId, user_name } = req.query;

    if (!course) {
      return res.status(400).json({ success: false, error: "Course is required" });
    }

    const insertedCount = await autoFillStipendData(course, month, userId, user_name);
    res.status(200).json({
      success: true,
      message: `${insertedCount} stipend records auto-filled successfully`
    });

  } catch (error) {
    console.error("Error auto-filling stipend:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const deleteStipends = async (req, res) => {
  try {
    const { course, month } = req.query;
    if (!course || month === undefined) {
      return res.status(400).json({ success: false, error: "Course and month are required" });
    }

    const deletedCount = await deleteStipendData(course, month);
    res.status(200).json({
      success: true,
      message: `${deletedCount} stipend records deleted successfully`
    });
  } catch (error) {
    console.error("Error deleting stipend records:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// const promoteStudentsController = async (req, res) => {
//     try {
//         const { course, batchYear, currentYear } = req.body;

//         if (!course || !batchYear || !currentYear) {
//             return res.status(400).json({ message: "All fields required" });
//         }

//         const updatedCount = await promoteStudentsService(course, batchYear, currentYear);

//         if(updatedCount === 0) {
//             return res.status(404).json({ message: "No students found to promote" });
//         }

//         return res.status(200).json({
//             message: "Students promoted successfully",
//             updatedCount
//         });

//     } catch (error) {
//         console.error("Promote error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// controllers/student.controller.js
const addStudentController = async (req, res) => {
  try {
    const id = await addStudentService(req.body);
    return res.status(201).json({ success: true, message: "Student added successfully" });

  } catch (error) {
    if (error.code === "ROLL_EXISTS") {
      return res.status(400).json({ success: false, message: "Roll number already exists" });
    }
    if (error.code === "APPLICATION_EXISTS") {
      return res.status(400).json({ success: false, message: "Application number already exists" });
    }
    
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE student
const deleteStudentController = async (req, res) => {
  try {
    const deletedStudent =  await deleteStudent(req.params.roll_no);
    res.json({ message: "Student deleted successfully", student: deletedStudent });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// add or update student
const addOrUpdateStudentController = async (req, res) => {
  try {
    const { id, updated } = await addOrUpdateStudentService(req.body);
    return res.status(200).json({
      success: true,
      message: updated ? "Student updated successfully" : "Student added successfully",
      id,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Filtered student retrieval
const getFilteredStudents = async (req, res) => {
  try {
    const { course, batchYear, currentYear } = req.query;
    if (!course || !batchYear || !currentYear)
      return res.status(400).json({ message: "Missing required filters" });

    const students = await fetchStudentsByFilter(course, batchYear, currentYear);
    res.status(200).json({ students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Promote selected students
const promoteSelectedStudents = async (req, res) => {
  try {
    const { course, batchYear, currentYear, selectedStudents, newDOJ  } = req.body;
    if (!course || !batchYear || !currentYear || !newDOJ)
      return res.status(400).json({ message: "Missing required data" });

    if (!selectedStudents || !Array.isArray(selectedStudents) || selectedStudents.length === 0)
      return res.status(400).json({ message: "No students selected" });

    const nextYear = (parseInt(currentYear) + 1).toString();

    const count = await promoteStudentsService(selectedStudents, nextYear, newDOJ);
    res.status(200).json({ message: `${count} students promoted to year ${nextYear}` });
  } catch (err) {
    console.error("Error promoting students:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete student stipend record from stipend details table
const deleteStudentStipend = async (req, res) => {
  try {
    const { id } = req.query;
    const { userInfo } = req.query; // optional (audit/logging)

    if (!id) {
      return res.status(400).json({ success: false, message: "Stipend ID is required", });
    }

    const result = await deleteStudentStipendById(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Record not found", });
    }

    res.status(200).json({ success: true, message: "Stipend record deleted successfully", });
  } catch (error) {
    console.error("Delete stipend error:", error);
    res.status(500).json({ success: false, message: "Internal server error", });
  }
};

//Update leaves and present days for a student stipend details table
const updateLeavesController = async (req, res) => {
  try {
    const { id, leaves, present } = req.body;
    const userInfo = req.user;

    if (!id || leaves === undefined || present === undefined) {
      return res.status(400).json({message: "Required fields missing",});
    }

    const updatedRow = await updateLeavesAndPresent({
      id, leaves, present, userInfo, });

    return res.status(200).json({
      message: "Updated successfully", data: updatedRow, });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error", });
  }
};


module.exports = { getStudentInfo, submitStipend,getAllStipends, stipendApprovalController,
   stipendBulkApprovalController, addCourseStipendController, addOrUpdateStudentLeave, autoFillStipends,
  deleteStipends, addStudentController, getFilteredStudents, promoteSelectedStudents, deleteStudentController,
addOrUpdateStudentController, deleteStudentStipend, updateLeavesController};