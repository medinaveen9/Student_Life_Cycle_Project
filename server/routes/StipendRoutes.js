const express = require('express');
const router = express.Router();
const { getStudentInfo, submitStipend ,getAllStipends,  addCourseStipendController,
    stipendApprovalController, stipendBulkApprovalController} = require('../controllers/StipendController');

const { verifyToken } = require('../config/VerifyToken');
 
router.get('/stipend_details', verifyToken, getAllStipends); 
router.get('/student', verifyToken, getStudentInfo);
router.post('/submit', verifyToken, submitStipend);
router.get('/action_status', verifyToken, stipendApprovalController);
router.post('/bulk_approval', verifyToken, stipendBulkApprovalController);
router.post('/add_course_stipend', verifyToken, addCourseStipendController);

module.exports = router;

