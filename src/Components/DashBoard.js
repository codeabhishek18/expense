import { useEffect } from "react";
import Chart from './Chart'
import { useGlobalContext } from "../Context/GlobalContext";
import DoughnutComponent from "./DoughnutComponent";
import NewTransactions from "./NewTransactions";

const DashBoard = () =>
{
    const { showIncomes, showExpenses, calculateIncomes, calculateExpenses, totalBalance } = useGlobalContext();
    
    useEffect(()=>
    {
        const token = localStorage.getItem('token');
        showIncomes(token);
        showExpenses(token);
    },[])

    return(
        <div>
            <div className="flex gap-2 text-white mb-4">
                <div className="flex flex-col gap-2 w-1/3 rounded-md p-4 text-center bg-black bg-opacity-40">
                    <label className="text-xs">Total Income </label>
                    <label>₹ {calculateIncomes()}</label>
                </div>
                <div className="flex flex-col gap-2 w-1/3 rounded-md p-4 text-center bg-black bg-opacity-40">
                    <label className="text-xs">Total Expenses</label>
                    <label>₹ {calculateExpenses()}</label>
                </div>
                <div className="flex flex-col gap-2 w-1/3 rounded-md p-4 text-center bg-black bg-opacity-40">
                    <label className="text-xs">Net Balance </label>
                    <label>₹ {totalBalance()}</label>
                </div>
            </div>
            <div className="flex gap-12">
                <div className="h-72 aspect-square">
                    <DoughnutComponent/>
                </div>
                <div className="w-1/2">
                    <NewTransactions/>
                </div>
            </div>
        </div>
    )

}

export default DashBoard;