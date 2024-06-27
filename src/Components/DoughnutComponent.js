import { Doughnut } from "react-chartjs-2";
import { useGlobalContext } from "../Context/GlobalContext";

const DoughnutComponent = () =>
{

    const { calculateIncomes, calculateExpenses } = useGlobalContext();

    const totalIncome = calculateIncomes();
    const totalExpenses = calculateExpenses();

    const data =
    {
        labels : ['Income', 'Expenses'],
        datasets : [
            {
                label : 'Income vs Expenses',
                data : [ totalIncome, totalExpenses ],
                backgroundColor : [
                    'cyan',
                    'yellow'
                ],
                borderColor: ['cyan', 'yellow']
            }
        ]
    }

    const options = 
    {
        plugins : {
            title : {
                color : 'white'
            },
            legend : {
                labels : {
                    color : 'white'
                }
            },
        }
    }

    return(
        <div>
            <Doughnut data={data} options={options}/>
        </div>
    )
    
}

export default DoughnutComponent;