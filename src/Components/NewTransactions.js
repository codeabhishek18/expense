import { useGlobalContext } from "../Context/GlobalContext";

const NewTransactions = () =>
{

    const { recentTransactions } = useGlobalContext();
    const [...history] = recentTransactions();

    return(
        <div>
            <p className="mb-6 text-white text-center">Recent Transactions</p>
            {history.map((items) =>
            (
                <div key={items._id} className=" flex flex-col justify-center gap-2 w-72 bg-black bg-opacity-40 p-2 m-2 text-xs rounded-sm text-white">
                    <span className="w-1.5 h-6 absolute" style={{ backgroundColor : items.type === 'income' ? 'cyan' : 'yellow'}}></span>
                    <div className="flex justify-between">
                        <label className="ml-4">{items.category}</label>
                        <label>₹ {items.amount}</label>
                    </div>
                    <div style={{ color : 'grey' }} className="flex justify-between ml-4">   
                        <label>{new Date(items.createdAt).toDateString()}</label>
                        <label>{items.description}</label>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default NewTransactions;