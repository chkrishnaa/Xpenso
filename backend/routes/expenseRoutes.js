const express = require('express');

const {addExpense, getAllExpense, deleteExpense, deleteAllExpense, exportExpenseDetails} = require('../controllers/expenseController');
const {protect} = require('../middleware/authMiddleware');

const expenseRoutes = express.Router();

expenseRoutes.post('/add-expense',protect, addExpense);
expenseRoutes.get('/expenses',protect, getAllExpense);
expenseRoutes.delete('/:id',protect, deleteExpense);
expenseRoutes.delete("/",protect, deleteAllExpense);
expenseRoutes.get('/export-expense-details',protect, exportExpenseDetails);

module.exports = expenseRoutes;