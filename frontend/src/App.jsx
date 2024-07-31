import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import DataTable from './components/DataTable'

import './App.css' 

const App = () => {
  const [summaryData, setSummaryData] = useState({});
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/view/summary');
        const data = await response.json();
        setSummaryData(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching summary:', error)
      };
    };

    const fetchAllData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/view/all');
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.error('Error fetching data: ', error)  ;
      }
    };

    fetchSummary();
    fetchAllData();
  }, []);

  return (
    <div className="flex flex-row gap-4 p-4 bg-gray-900 text-white h-full">
      <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-md">
        <Dashboard summaryData={summaryData} />
      </div>
      <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-md">
        <DataTable allData={allData} />
      </div>
    </div>
  );
};

export default App;
