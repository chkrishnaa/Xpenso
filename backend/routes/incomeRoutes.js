const express = require('express')

const {addIncome, getAllIncome, deleteIncome, deleteAllIncome, exportIncomeDetails} = require('../controllers/incomeController');
const {protect} = require('../middleware/authMiddleware');

const incomeRoutes = express.Router();

incomeRoutes.post('/add-income',protect, addIncome);
incomeRoutes.get('/incomes',protect, getAllIncome);
incomeRoutes.delete('/:id',protect, deleteIncome);
incomeRoutes.delete("/",protect, deleteAllIncome);
incomeRoutes.get('/export-income-details',protect, exportIncomeDetails);

module.exports = incomeRoutes;