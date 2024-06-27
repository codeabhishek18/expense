// import { useEffect, useState } from "react";
// import { useGlobalContext } from "../Context/GlobalContext";

// const Expense = ()  =>
// {
//     const { expenses, showExpenses, addExpenses, deleteExpenses, calculateExpenses } = useGlobalContext();
//     const [ expense, setExpense ] = useState({category: '', amount:'', description:''});

//     useEffect(()=>
//     {
//         const token = localStorage.getItem('token');
//         showExpenses(token);
//     },[])

//      const handleChange = (e) =>
//     {
//         let { name, value } = e.target;
//         setExpense({...expense, [name] : value});
//     }

//     const handleExpenses = (e) =>
//     {
//         e.preventDefault();
//         const token = localStorage.getItem('token');
//         addExpenses(token, expense);
//         setExpense({category:'', amount:'', description:'' })
//     }   

//     const handleDelete = (id) =>
//     {
//         const token = localStorage.getItem('token');
//         deleteExpenses(token, id)
//     }

//     return(
//         <div className="flex flex-col gap-4">
//             <label className="flex justify-center text-xl rounded-md py-4 text-white bg-black bg-opacity-40">Total Expense : ₹ {calculateExpenses()}</label>
//             <div className="gap-4 flex">
//                 <div className="flex flex-col gap-4 text-sm">
//                     <select name="category" className="py-1 px-1 text-xs w-56 rounded-sm" value={expense.category} onChange={handleChange}>
                        // <option value="">Choose category</option>
                        // <option value="Housing">Housing</option>
                        // <option value="Food">Food</option>
                        // <option value="Healthcare">Healthcare</option>
                        // <option value="Transportation">Transportation</option>
                        // <option value="Utilities">Utilities</option>
                        // <option value="Entertainment">Entertainment</option>
                        // <option value="Debt Payments">Debt Payments</option>
                        // <option value="Persona Care">Personal Care</option>
                        // <option value="Travel">Travel</option>
                        // <option value="Miscellaneous">Miscellaneous</option>
//                     </select>
//                     <input name="amount" className="py-1 px-2 text-xs w-56 rounded-sm" placeholder="Amount" value={expense.amount} onChange={handleChange}/>
//                     <input name="description" className="py-1 px-2 text-xs w-56 rounded-sm" placeholder="Description" value={expense.description} onChange={handleChange}/>
//                     <button onClick={handleExpenses} className="bg-black bg-opacity-40 py-1 text-white rounded-md mb-3 text-xs">Add Transaction</button>       
//                 </div>
//                 <div className="text-white">
//                     {expenses?.map((list, index) =>
//                     (
//                         <div key={index} className="flex bg-black bg-opacity-40 p-4 text-sm justify-between items-center mb-2 rounded-md w-96">
//                             <button className="absolute" onClick={(e)=>{e.preventDefault(); handleDelete(list._id)}}>🗑️</button>
//                             <div className="flex">
//                                 <p style={{ backgroundColor : 'yellow', color : 'black'}} className="flex items-center py-0.25 px-2 ml-8 text-xs rounded-sm">{list.category}</p>
//                                 <p style={{ fontSize : '0.75rem', color: 'grey'}} className="ml-4" >{list.description}</p>
//                             </div>
//                             <p>₹ {list.amount}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//         )
// }

// export default Expense;

import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

const Expense = ()  =>
{
    const { expenses, showExpenses, addExpenses, deleteExpenses, calculateExpenses } = useGlobalContext();
    const [ expense, setExpense ] = useState({category: '', amount:'', description : ''});
    const [ sortBy, setSortBy ] = useState('date-des');
    const [ filtered, setFiltered ] = useState('All')
    const [ dateRange, setDateRange ] = useState('');
    
    useEffect(()=>
    {
        const token = localStorage.getItem('token');
        showExpenses(token);
    },[])

     const handleChange = (e) =>
    {
        let { name, value } = e.target;
        setExpense({...expense, [name] : value});
    }

    const handleExpenses = (e) =>
    {
        e.preventDefault();
        const token = localStorage.getItem('token');
        addExpenses(token, expense);
        setExpense({category:'', amount:'', description:'' })
    }   

    const handleDelete = (id) =>
    {
        const token = localStorage.getItem('token');
        deleteExpenses(token, id)
    }

    const sortedExpense= [...expenses].sort((a,b) =>
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
        
    const filteredExpense = sortedExpense.filter((expense) => expense.category === filtered)

    const displayExpense = filtered === 'All' ? sortedExpense : filteredExpense

    const calculateDateRange = (range) =>
    {
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;

        switch(range)
        {
            case '24h' : return new Date(currentDate.getTime() - oneDay);
            case '7d' : return new Date(currentDate.getTime() - 7 * oneDay);
            case '14d' : return new Date(currentDate.getTime() - 14 * oneDay);
            case '28d' : return new Date(currentDate.getTime() - 28 * oneDay);
            case '60d' : return new Date(currentDate.getTime() - 60 * oneDay);
            case '90d' : return new Date(currentDate.getTime() - 90 * oneDay);
            case '180d' : return new Date(currentDate.getTime() - 180 * oneDay);
            case '1y' : return new Date(currentDate.getTime() - 365 * oneDay);
            default : return new Date(0);
        }
    }

    const ExpenseByDate = displayExpense.filter((expense) => calculateDateRange(dateRange).getTime() - new Date(expense.createdAt).getTime())

    return(
        <div className="flex gap-8">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 text-sm w-52">            
                    <select name="category" className="py-1 px-1 text-xs rounded-sm" value={expense.category} onChange={handleChange}>
                        <option value="">Choose category</option>
                        <option value="Housing">Housing</option>
                        <option value="Food">Food</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Debt Payments">Debt Payments</option>
                        <option value="Persona Care">Personal Care</option>
                        <option value="Travel">Travel</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                    <input name="amount" className="py-1 px-2 text-xs rounded-sm" placeholder="Amount" value={expense.amount} onChange={handleChange}/>
                    <input name="description" className="py-1 px-2 text-xs rounded-sm" placeholder="Description" value={expense.description} onChange={handleChange}/>
                    <button onClick={handleExpenses} className="bg-black bg-opacity-40 py-2 text-center text-white rounded-sm text-xs">Add Transaction</button>       
                </div>
                <div className="flex flex-col text-xs gap-2">
                    <label className="bg-black bg-opacity-40 py-1 px-2 rounded-sm text-white">Sort By</label>
                    <select className="rounded-sm p-1" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value='date-asc'>Date : Oldest to Newest</option>
                        <option value='date-des'>Date : Newest to Oldest</option>
                        <option value='amount-asc'>Amount : Lowest to Highest</option>
                        <option value='amount-des'>Amount : Highest to Lowest</option>
                    </select>
                </div>
                <div className="flex flex-col text-xs gap-2">
                    <label className="bg-black bg-opacity-40 py-1 px-2 rounded-sm text-white">Filter By Category</label>
                    <select className="rounded-sm p-1" value={filtered} onChange={(e) => setFiltered(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Housing">Housing</option>
                        <option value="Food">Food</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Debt Payments">Debt Payments</option>
                        <option value="Persona Care">Personal Care</option>
                        <option value="Travel">Travel</option>
                        <option value="Miscellaneous">Miscellaneous</option>
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
            </div>
            <div className="gap-2 flex flex-col">  
                <div className="rounded-sm py-2 px-12 flex flex-col gap-1 items-center justify-center bg-black bg-opacity-40 text-white w-96">
                    <label className="text-xs">Total Expenses</label>
                    <label>₹ {calculateExpenses()}</label>
                </div>
                <div className="text-white">
                {ExpenseByDate?.map((list, index) =>
                (
                    <div key={index} className="flex bg-black bg-opacity-40 p-4 text-xs flex-col mb-2 rounded-md gap-2 w-96">
                        <button className="absolute" onClick={(e)=>{e.preventDefault(); handleDelete(list._id)}}>🗑️</button>
                        <div className="flex justify-between">
                            <p style={{ backgroundColor : 'yellow', color : 'black'}} className="flex items-center py-0.25 px-2 ml-8 text-xs rounded-sm">{list.category}</p>
                            <p>₹ {list.amount}</p>
                        </div>
                        <div style={{ color: 'grey'}} className="flex justify-between ml-8">
                            <p>{new Date(list.createdAt).toDateString()}</p>
                            <p className="ml-4" >{list.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Expense;