const express = require('express');
const { analyzeUserResponses } = require('../controllers/userController');
const router = express.Router();

router.post('/submit-responses', analyzeUserResponses);

module.exports = router;
