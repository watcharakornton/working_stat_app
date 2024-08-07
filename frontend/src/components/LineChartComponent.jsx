import React, { useState, useEffect } from 'react'
import { Card, Title, LineChart, Divider } from "@tremor/react";
import { getData } from '../api/api'

const LineChartComponent = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('/view/summary-month');
        setResult(response)
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  } ,[]);
  return (
    <>
      <Card className="mt-4" decoration="top" decorationColor="slate">
        <Title className="text-xl">Summary by month (Line Chart)</Title>
        <Divider />
        <LineChart
          className="h-72 mt-4"
          data={result}
          index="date"
          categories={['Change Requests', 'Sitemaps', 'CMS Trainings']}
          colors={['indigo', 'cyan', 'fuchsia']}
        />
      </Card>
    </>
  )
}

export default LineChartComponent;
