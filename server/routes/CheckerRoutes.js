const express = require('express');
const router = express.Router();
const checkerController = require('../controllers/CheckerController');

router.get('/', checkerController.getAllChecker);

module.exports = router;
