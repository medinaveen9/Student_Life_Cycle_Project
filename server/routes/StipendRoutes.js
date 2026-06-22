
const express = require('express');
const router = express.Router();
const { getStudentInfo, submitStipend ,getAllStipends,  addCourseStipendController, addOrUpdateStudentLeave,
    stipendApprovalController, stipendBulkApprovalController, autoFillStipends, deleteStipends,
 addStudentController, getFilteredStudents, promoteSelectedStudents, deleteStudentController,
addOrUpdateStudentController, deleteStudentStipend, updateLeavesController } = require('../controllers/StipendController');

const { verifyToken, authorizeRole } = require('../config/VerifyToken');

const stipendViewRoles = ["Checker", "Verifier", "Approver", "FA", "FC",];
const stipendApprovalRoles = ["Checker", "Verifier", "Approver", "FA", "FC"];
const stipendEntryRoles = ["Checker", "Verifier", "Approver"];
const stipendAdminRoles = [ "Checker"];
const stipendReportRoles = [ "Dean"];

router.get('/stipend_details', verifyToken, authorizeRole(...stipendViewRoles), getAllStipends); 
router.get('/student', verifyToken, authorizeRole(...stipendEntryRoles), getStudentInfo);
router.post('/submit', verifyToken, authorizeRole(...stipendEntryRoles), submitStipend);
router.get('/action_status', verifyToken, authorizeRole(...stipendApprovalRoles), stipendApprovalController);
router.post('/bulk_approval', verifyToken, authorizeRole(...stipendApprovalRoles), stipendBulkApprovalController);
router.post('/add_course_stipend', verifyToken, authorizeRole(...stipendReportRoles), addCourseStipendController);
router.post('/add_leave', verifyToken, authorizeRole(...stipendAdminRoles), addOrUpdateStudentLeave);
router.post("/auto-fill", verifyToken, authorizeRole(...stipendAdminRoles), autoFillStipends);
router.post("/delete", verifyToken, authorizeRole(...stipendAdminRoles), deleteStipends);
router.post("/add-student", verifyToken, authorizeRole(...stipendAdminRoles), addStudentController);
router.get("/filter-students", verifyToken, authorizeRole(...stipendViewRoles), getFilteredStudents);
router.put("/promote-students", verifyToken, authorizeRole(...stipendAdminRoles), promoteSelectedStudents);
router.delete("/delete-student/:roll_no", verifyToken, authorizeRole(...stipendAdminRoles), deleteStudentController);
router.post("/add-or-update-student", verifyToken, authorizeRole(...stipendAdminRoles), addOrUpdateStudentController);
router.delete("/delete_student_stipend", verifyToken, authorizeRole(...stipendAdminRoles), deleteStudentStipend);
router.put("/update_leaves_present", verifyToken, authorizeRole(...stipendAdminRoles), updateLeavesController);

module.exports = router;
