import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ targetAmounts, achievedAmounts }) => {
  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Target Amount',
        data: targetAmounts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Achieved Amount',
        data: achievedAmounts,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Target vs Achieved Amount',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;