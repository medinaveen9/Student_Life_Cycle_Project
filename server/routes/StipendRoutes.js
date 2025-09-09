const express = require('express');
const router = express.Router();
const stipendController = require('../controllers/StipendController');

router.post('/', stipendController.submitStipend);
router.get('/', stipendController.getAllStipends); 

module.exports = router;

