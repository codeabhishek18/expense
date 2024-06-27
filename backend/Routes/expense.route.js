const router = require('express').Router();
const { getAllExpenses, postExpense, deleteExpense } = require('../Controller/expense.controller');

router.get('/get-expense', getAllExpenses);
router.post('/add-expense', postExpense);
router.delete('/delete-expense/:id', deleteExpense);

module.exports = router;