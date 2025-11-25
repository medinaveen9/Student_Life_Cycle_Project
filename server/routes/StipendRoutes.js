const express = require('express');
const router = express.Router();
const { getStudentInfo, submitStipend ,getAllStipends,  addCourseStipendController, addOrUpdateStudentLeave,
    stipendApprovalController, stipendBulkApprovalController, autoFillStipends, deleteStipends,
 addStudentController, getFilteredStudents, promoteSelectedStudents } = require('../controllers/StipendController');

const { verifyToken } = require('../config/VerifyToken');
 
router.get('/stipend_details', verifyToken, getAllStipends); 
router.get('/student', verifyToken, getStudentInfo);
router.post('/submit', verifyToken, submitStipend);
router.get('/action_status', verifyToken, stipendApprovalController);
router.post('/bulk_approval', verifyToken, stipendBulkApprovalController);
router.post('/add_course_stipend', verifyToken, addCourseStipendController);
router.post('/add_leave', verifyToken, addOrUpdateStudentLeave);
router.post("/auto-fill", autoFillStipends);
router.post("/delete", deleteStipends);
router.post("/add-student", addStudentController);
router.get("/filter-students", getFilteredStudents);
router.put("/promote-students", promoteSelectedStudents);

module.exports = router;

