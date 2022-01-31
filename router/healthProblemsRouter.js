const express = require('express');
const { showByScore } = require('../controllers/healthProblemsController');

const healthProblemsRouter = express.Router();

healthProblemsRouter.get('/', showByScore);

module.exports = healthProblemsRouter;
