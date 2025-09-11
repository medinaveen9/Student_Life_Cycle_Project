const express = require('express');
const router = express.Router();
const checkerController = require('../controllers/CheckerController');

router.get('/', checkerController.getAllChecker);
router.put('/certificate/:id/approve', checkerController.updateApproverStatus);
router.put('/certificate/:id/check', checkerController.updateCheckerStatus);
module.exports = router;
