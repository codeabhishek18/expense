import { useState } from "react";
import DashBoard from "./DashBoard";
import Expense from "./Expense";
import Header from "./Header";
import Income from "./Income";
import RegisterUser from "./RegisterUser";
import AllTransactions from "./AllTransactions";

const Test = () =>
{
    const [ active, setActive ] = useState(1);

    const displayContent = () =>
    {
        switch(active)
        {
            case 1 : 
                return <DashBoard/>
            case 2 : 
                return <Income/>
            case 3 : 
                return <Expense/>
            case 4 : 
                return <AllTransactions/>
            default : 
                return <DashBoard/>
        }
    }

    return(
        <div className="w-screen h-min-[100vh] bg-gradient-to-tl from-black flex to-blue-950">
            <Header active={active} setActive={setActive}/>
            <div className="flex h-min-screen flex-col m-28">
                {displayContent()}     
            </div> 
        </div>
    )
}

export default Test;