import { useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import '../App.css'
import Chart from "./Chart";

const AllTransactions = () =>
{
    const { incomes, showIncomes, expenses, showExpenses, calculateIncomes, calculateExpenses, totalBalance } = useGlobalContext();
    const [ transactionType, setTransactionType ] = useState('')
    const [ sortBy, setSortBy ] = useState('date-des');
    const [ dateRange, setDateRange ] = useState('');

    const transactions = [...incomes, ...expenses].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log(transactions);

    const filterByType = transactions.filter((transaction) => transaction.type === transactionType);
    const displayType = transactionType === '' ? transactions : filterByType;

    const chartIncome = transactionType === 'expense' ? [] : [...incomes]
    const chartExpense = transactionType === 'income' ? [] : [...expenses]

    const sortedTransactions = displayType.sort((a,b) =>
    {
        if(sortBy === 'date-asc')
        {
            return new Date(a.createdAt) - new Date(b.createdAt)
        }
        else if(sortBy === 'date-des')
        {
            return new Date(b.createdAt) - new Date(a.createdAt)
        }
        else if(sortBy === 'amount-asc')
        {
            return a.amount - b.amount;
        }
        else if(sortBy === 'amount-des')
        {
            return b.amount - a.amount;
        }
    })

    const calculateDateRange = (range) =>
    {
        const currentDate = new Date();

        switch(range)
        {
            case '24h' : return new Date(currentDate.getDate() - 1);
            case '7d' : return new Date(currentDate.getDate() - 7);
            case '14d' : return new Date(currentDate.getDate() - 14);
            case '28d' : return new Date(currentDate.getDate() - 28);
            case '60d' : return new Date(currentDate.getDate() - 60);
            case '90d' : return new Date(currentDate.getDate() - 90);
            case '180d' : return new Date(currentDate.getDate() - 180);
            case '1y' : return new Date(currentDate.getDate() - 365);
            default : return new Date(0);
        }
    }

    const transactionsByDate = sortedTransactions.filter((transaction) => calculateDateRange(dateRange).getDate() - new Date(transaction.createdAt).getDate())


    const transactionTotal = () =>
    {
        if(transactionType === '')
            return totalBalance();

        let total = 0;
        transactionsByDate.forEach((transaction)=>
        {
            total+= transaction.amount;
        })
        if(transactionType === 'expense')
            return `- ${total}`;
        return total;
    }

    return(
    <div className="flex flex-col gap-8">
        <div className="flex gap-4">
            <div className="flex w-52 flex-col text-xs gap-2">
                <label className="bg-black bg-opacity-40 py-1 px-2 rounded-sm text-white">Sort By</label>
                <select className="rounded-sm p-1" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value='date-asc'>Date : Oldest to Newest</option>
                    <option value='date-des'>Date : Newest to Oldest</option>
                    <option value='amount-asc'>Amount : Lowest to Highest</option>
                    <option value='amount-des'>Amount : Highest to Lowest</option>
                </select>
            </div>
            <div className="flex flex-col text-xs gap-2 text-black">
                <label className="bg-black bg-opacity-40 py-1 px-2 rounded-sm text-white">Filter By Type</label>
                <select className="rounded-sm p-1" value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                    <option value=''>All</option>
                    <option value='income'>Income</option>
                    <option value='expense'>Expense</option>
                </select>
            </div>  
            <div className="flex flex-col text-xs gap-2">
                <label className="bg-black bg-opacity-40 py-1 px-2 rounded-sm text-white">Filter By Date</label>
                <select className="rounded-sm p-1" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="14d">Last 14 days</option>
                    <option value="28d">Last 28 days</option>
                    <option value="60d">Last 60 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="180d">Last 180 days</option>
                    <option value="1y">Last 1 year</option>
                </select>
            </div>
            <div className="bg-black bg-opacity-40 gap-2 py-1 px-2 rounded-sm flex flex-col items-center justify-center text-white">
                <label className="text-xs">Adjusted Balance </label>
                <label>₹ {transactionTotal()}</label>
            </div>
            <div className="bg-black bg-opacity-40 gap-2 py-1 px-4 rounded-sm flex flex-col items-center justify-center text-white">
                <label className="text-xs">Net Balance </label>
                <label>₹ {totalBalance()}</label>
            </div>
        </div>    
        <Chart incomes={chartIncome} expenses={chartExpense}/>    
        <div className="grid grid-cols-2 gap-2">
        {transactionsByDate?.map((list, index) =>
                (
                    <div key={index} className="flex bg-black bg-opacity-40 p-4 text-xs flex-col mb-2 rounded-md gap-2 w-54">
                        <div className="flex justify-between">
                            <p style={{ backgroundColor : list.type === 'income' ? 'cyan' : 'yellow', color : 'black'}} className="flex items-center py-0.25 px-2 ml-8 text-xs rounded-sm">{list.category}</p>
                            <p className="text-white">₹ {list.amount}</p>
                        </div>
                        <div style={{ color: 'grey'}} className="flex justify-between ml-8">
                            <p>{new Date(list.createdAt).toDateString()}</p>
                            <p className="ml-4" >{list.description}</p>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    )

}

export default AllTransactions;