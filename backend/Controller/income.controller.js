const IncomeService = require('../Services/income.services');
const IncomeServiceInstance = new IncomeService();

const getAllIncome = async (req, res) =>
{
    console.log(req.userId)
    try
    {
        const userId = req.user._id;
        const result = await IncomeServiceInstance.getIncomeById(userId);
        res.status(200).json(result);
    }
    catch(error)
    {
        res.json(error);
    }
}

const postIncome = async (req,res) =>
{
    try
    {
        const { category, amount, description } = req.body;
        const user = req.user;
        const userId = user._id.toString();
        const result = await IncomeServiceInstance.addIncomeById(userId, category, amount, description);
        res.status(201).json(result);
    }
    catch(error)
    {
        res.json(error);
    }
}

const deleteIncome = async (req, res) =>
{   
    try
    {
        const {id} = req.params;
        const userId = req.user._id;
        const result = await IncomeServiceInstance.deleteIncomeById(userId, id);
        res.status(200).json(result);
    }
    catch(error)
    {
        res.json(error);
    }
}


module.exports = { getAllIncome, postIncome, deleteIncome }