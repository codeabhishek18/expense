const ExpenseService = require('../Services/expense.services');
const ExpenseServiceInstance = new ExpenseService();

const getAllExpenses = async (req, res) =>
{
    try
    {
        const userId = req.user._id;
        const result = await ExpenseServiceInstance.getExpenseById(userId);
        res.status(200).json(result);
    }
    catch(error)
    {
        res.json(error);
    }
}

const postExpense = async (req,res) =>
{
    try
    {
        const { category, amount, description } = req.body;
        const userId = req.user._id;
        const result = await ExpenseServiceInstance.addExpenseById(userId, category, amount, description);
        res.status(201).json(result);
    }
    catch(error)
    {
        res.json(error);
    }
}

const deleteExpense = async (req, res) =>
{
    try
    {
        const {id} = req.params;
        const userId = req.user._id;
        const result = await ExpenseServiceInstance.deleteExpenseById(userId, id);
        res.status(200).json(result);
    }
    catch(error)
    {
        res.json(error);
    }
}


module.exports = { getAllExpenses, postExpense, deleteExpense }