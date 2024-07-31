import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ summaryData }) => {
  // Pie chart data
  const pieData = {
    labels: ['Change Requests', 'Sitemaps', 'CMS Training'],
    datasets: [
      {
        label: 'Data Summary',
        data: [summaryData.totalChangeRequests, summaryData.totalSitemaps, summaryData.totalCmsTrainings],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ['Change Requests', 'Sitemaps', 'CMS Training'],
    datasets: [
      {
        label: 'Total Count',
        data: [summaryData.totalChangeRequests, summaryData.totalSitemaps, summaryData.totalCmsTrainings],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Data Summary',
      },
    },
  };

  return (
    <div className="chart-container bg-gray-800 p-4 rounded-lg shadow-md">
      <Bar data={barData} options={options} />
    </div>
  );
};

export default Dashboard;
