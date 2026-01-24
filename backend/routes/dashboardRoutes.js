const express = require('express')
const {protect} = require('../middleware/authMiddleware');
const {getDashboardData} = require('../controllers/dashboardController');

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", protect, getDashboardData);

module.exports = dashboardRoutes;