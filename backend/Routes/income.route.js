const router = require('express').Router();
const { getAllIncome, postIncome, deleteIncome } = require('../Controller/income.controller');

router.get('/get-income', getAllIncome);
router.post('/add-income', postIncome);
router.delete('/delete-income/:id', deleteIncome);

module.exports = router;