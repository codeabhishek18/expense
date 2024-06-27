const Income = require('../Models/income.model');
const User = require('../Models/user.model');

class IncomeService
{
    getIncomeById = async (userId) =>
    {
        const user = await User.findById(userId).populate('incomes');
        return user.incomes;
    }

    addIncomeById = async (userId, category, amount, description) =>
    {
        const newIncome = new Income({ category, amount, description });
        await newIncome.save();
        const user = await User.findByIdAndUpdate(userId, { $push : { incomes : newIncome } },{ new : true }).populate('incomes');
        return user;
    }

    deleteIncomeById = async (userId, incomeId) =>
    {
        await Income.findByIdAndDelete(incomeId);
        const user = await User.findById(userId);
        user.incomes.pull(incomeId);
        await user.save();
    }
}

module.exports = IncomeService;