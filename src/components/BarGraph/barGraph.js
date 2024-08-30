import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ months, creditAmounts, debitAmounts }) => {
    const data = {
        labels: months, // Months should now include year
        datasets: [
            {
                label: 'Credit',
                data: creditAmounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Debit',
                data: debitAmounts,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: $${context.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Month-Year'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount'
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default BarGraph;
