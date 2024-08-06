import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardItem from './CardItem'
import BarChartComponent from './BarChartComponent'
import AreaChartComponent from './AreaChartComponent'
import TableComponent from './TableComponent'
import { getData } from '../api/api'

const LeftColumn = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('/view/summary');
        setData(response)
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full flex flex-col justify-between p-2">
      <div className="flex flex-col lg:flex-row gap-2 w-full">
        <CardItem title={"Change Requests"} data={data.totalChangeRequests}/>
        <CardItem title={"Sitemaps"} data={data.totalSitemaps}/>
        <CardItem title={"CMS Trainings"} data={data.totalCmsTrainings}/>
      </div>
      <div className="flex-auto w-full">
        <BarChartComponent />
        <AreaChartComponent />
        <TableComponent />
      </div>
    </div>
  )
}

export default LeftColumn;
