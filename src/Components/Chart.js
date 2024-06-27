import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import { DateFormat } from './DateFormat'
import { useGlobalContext } from '../Context/GlobalContext'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart({incomes, expenses}) 
{
    const data = {
        labels: incomes.length ? 
            incomes.map((inc) =>
            {
                const {date} = inc
                return DateFormat(date)
            }) : 
            expenses.map((exp) =>
            {
                const {date} = exp
                return DateFormat(date)
            }
        ),
        datasets: [
            {  
                borderColor : 'cyan',
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                borderColor: 'yellow',
                tension: .2
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
            scales : {
                y: {
                    ticks : {
                        color: 'white'
                    }
                },
                x: {
                    ticks : {
                        backgroundColor: 'white'
                    }
                },
            }
        }
    }

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}

export default Chart