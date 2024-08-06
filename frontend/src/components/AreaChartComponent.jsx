import React, { useState, useEffect } from "react";
import { Card, Title, AreaChart } from "@tremor/react";
import { getData } from '../api/api'

const dataFormatter = (number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

const AreaChartComponent = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('/view/total-month');
        setResult(response)
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  } ,[]);

  return (
    <>
      <Card className="mt-4">
        <Title>Total by month</Title>
        <AreaChart
          className="h-72 mt-4"
          data={result}
          index="date"
          categories={["Change Requests", "Sitemaps", "CMS Trainings"]}
          colors={["indigo", "cyan", "fuchsia"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </>
  );
};

export default AreaChartComponent;
