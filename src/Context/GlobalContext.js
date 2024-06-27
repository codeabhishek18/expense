import React, { useContext, useState } from "react"
import axios from "axios";
const BASE_URL_REGISTER = 'http://localhost:5000/v1/register/';
const BASE_URL = 'http://localhost:5000/v1/user/';
const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) =>
{   
    const [ incomes, setIncomes ] = useState([]);
    const [ expenses, setExpenses ] = useState([]);

    console.log(incomes, expenses)

    const showIncomes = async (token) => 
    {   
        const response = await axios.get(`${BASE_URL}incomes/get-income`,
        {
            headers :
            {
                'Authorization' : `Bearer ${token}`
            }
        });
        setIncomes(response.data);
    }

    const addIncomes = async (token, newIncome) =>
    {
        console.log(newIncome);
        await axios.post(`${BASE_URL}incomes/add-income`, newIncome,
        {
            headers :
            {
                'Authorization' : `Bearer ${token}`
            }
        });
        showIncomes(token);
    }

    const deleteIncomes = async (token, id) =>
    {
        console.log(id);
        await axios.delete(`${BASE_URL}incomes/delete-income/${id}`,
        {
            headers :
            {
                'Authorization' : `Bearer ${token}`
            }
        });
        showIncomes(token);
    }  

    const calculateIncomes = () =>
    {
        if(!incomes.length)
            return 0;

        let totalIncome = 0;
        incomes.forEach((income) =>
        {
            totalIncome += income.amount;
        })

        return totalIncome;
    }

    const showExpenses = async (token) =>
    {
        const response = await axios.get(`${BASE_URL}expenses/get-expense`,
        {
            headers :
            {
                'Authorization' : `Bearer ${token}`
            }
        })
        setExpenses(response.data);
    }

    const addExpenses = async (token, newExpense) =>
    {
        await axios.post(`${BASE_URL}expenses/add-expense`, newExpense,
        {
            headers :
            {
                'Authorization' : `Bearer ${token}`
            }
        })
        showExpenses(token);
    }

    const deleteExpenses = async (token, id) =>
    {
        await axios.delete(`${BASE_URL}expenses/delete-expense/${id}`,
        {
            headers :
            {
                'Authorization' : `Bearer ${token}`
            }
        })
        showExpenses(token);
    }

    const calculateExpenses = () =>
    {
        if(!expenses.length)
            return 0;

        let totalExpenses = 0;
        expenses.forEach((expense) =>
        {
            totalExpenses+= expense.amount;
        })

        return totalExpenses;
    }

    const totalBalance = () =>
    {
        return calculateIncomes() - calculateExpenses();
    }

    const recentTransactions = () =>
    {
        const history = [...incomes, ...expenses];
        history.sort((a,b) =>
        {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0,3);
    }

    const loginUser = async (user) =>
    {
        const response = await axios.post(`${BASE_URL_REGISTER}login`, user)
        return response.data;
    }

    const signUpUser = async (user) =>
    {
        const response = await axios.post(`${BASE_URL_REGISTER}signup`, user);
        return response.data;
    }

    const deleteUser = async (id) =>
    {
        await axios.delete(`${BASE_URL_REGISTER}delete-user/${id}`)
    }

    return(
        <GlobalContext.Provider value={{ 
            incomes, 
            showIncomes, 
            addIncomes, 
            deleteIncomes, 
            calculateIncomes,
            expenses, 
            showExpenses, 
            addExpenses, 
            deleteExpenses,
            calculateExpenses, 
            totalBalance,
            recentTransactions,
            loginUser,
            signUpUser,
            deleteUser
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>
{
    return useContext(GlobalContext)
}
