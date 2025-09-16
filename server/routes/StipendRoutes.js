const express = require('express');
const router = express.Router();
const { getStudentInfo, submitStipend } = require('../controllers/StipendController');
// const stipendController = require('../controllers/StipendController');

// router.post('/', stipendController.submitStipend);
// router.get('/', stipendController.getAllStipends); 

router.get('/student', getStudentInfo);
router.post('/submit', submitStipend);

module.exports = router;

