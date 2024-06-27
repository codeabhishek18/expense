const Expense = require('../Models/expense.model');
const User = require('../Models/user.model');

class ExpenseService
{
    getExpenseById = async (userId) =>
    {
        const user = await User.findById(userId).populate('expenses');
        return user.expenses;
    }

    addExpenseById = async (userId, category, amount, description) =>
    {
        const newExpense = new Expense({ category, amount, description });
        await newExpense.save();
        const user = await User.findByIdAndUpdate(userId, { $push : { expenses : newExpense }}, { new : true }).populate('expense');
        return user;
    }

    deleteExpenseById = async (userId, expenseId) =>
    {
        await Expense.findByIdAndDelete(expenseId);
        const user = await User.findById(userId);
        user.expenses.pull(expenseId);
        await user.save();
    }
}

module.exports = ExpenseService;