const express = require('express');
const router = express.Router();
const { getStudentInfo, submitStipend ,getAllStipends,  addCourseStipendController, addOrUpdateStudentLeave,
    stipendApprovalController, stipendBulkApprovalController, autoFillStipends, deleteStipends,
promoteStudentsController, addStudentController } = require('../controllers/StipendController');

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
router.put("/promote-students", promoteStudentsController);
router.post("/add-student", addStudentController);

module.exports = router;

