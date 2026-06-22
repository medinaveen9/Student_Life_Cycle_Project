
const express = require('express');
const router = express.Router();
const checkerController = require('../controllers/CheckerController');
const {verifyToken, authorizeRole} = require('../config/VerifyToken');

const checkerRoles = ["Checker", "Approver", "Dean"];

router.get('/', verifyToken, authorizeRole(...checkerRoles),checkerController.getAllChecker);
router.put('/certificate/:id/approve',verifyToken,authorizeRole(...checkerRoles), checkerController.updateApproverStatus); 
router.put('/certificate/:id/check',verifyToken,authorizeRole(...checkerRoles), checkerController.updateCheckerStatus);
module.exports = router;

