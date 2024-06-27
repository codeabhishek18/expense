import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

const Home = ()  =>
{
    const { incomes, showIncomes, addIncomes, deleteIncomes, calculateIncomes } = useGlobalContext();
    const [ income, setIncome ] = useState({title:'', amount:'', description: ''});

    useEffect(()=>
    {
        showIncomes();
    },[])

     const handleChange = (e) =>
    {
        let { name, value } = e.target;
        setIncome({...income, [name] : value});
    }

    const handleIncomes = (e) =>
    {
        e.preventDefault();
        addIncomes(income);
    }   

    return(
        <div>
            <div>
                <input name="title" value={income.title} onChange={handleChange}/>
                <input name="amount" value={income.amount} onChange={handleChange}/>
                <input name="description" value={income.description} onChange={handleChange}/>   
                <button onClick={handleIncomes}>Add</button>       
            </div>
            <h1>{calculateIncomes()}</h1>
            <div>
                {incomes?.map((list, index) =>
                (
                    <div key={index}>
                        <p>{list.title}</p>
                        <p>{list.amount}</p>
                        <p>{list.description}</p>
                        <button onClick={()=>deleteIncomes(list._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;