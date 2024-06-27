const router = require('express').Router();
const incomeRoute = require('./income.route');
const expenseRoute = require('./expense.route');
const authentication = require('../Middlewares/auth.middleware');

router.use(authentication)
router.use('/incomes', incomeRoute);
router.use('/expenses', expenseRoute);

module.exports = router;