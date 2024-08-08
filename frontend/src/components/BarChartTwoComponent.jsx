import React, { useState, useEffect } from "react";
import { Card, Title, BarChart, Divider } from "@tremor/react";
import { getData } from '../api/api';

const BarChartComponent = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('/view/category-type');
        setResult(response)
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  } ,[]);

  return (
    <>
      <Card className="my-4" decoration="top" decorationColor="slate">
        <Title className="text-xl">Toal working each categories</Title>
        <Divider />
        <BarChart
          className="h-72 mt-4"
          data={result}
          index="name"
          categories={['WD', 'IR', 'WD/IR', 'INT', 'CSR', 'SD']}
          colors={['emerald', "blue", "red", "yellow", "slate", "orange"]}
        />
      </Card>
    </>
  );
};

export default BarChartComponent;
