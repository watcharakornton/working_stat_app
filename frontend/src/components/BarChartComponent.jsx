import React, { useState } from "react";
import { Card, Title, BarChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    "Change Requests": "1",
    "Sitemaps": "1",
    "CMS Trainings": 0,
  },
  {
    date: "Feb 22",
    "Change Requests": "2",
    "Sitemaps": "2",
    "CMS Trainings": 0,
  },
  {
    date: "Mar 22",
    "Change Requests": "3",
    "Sitemaps": "2",
    "CMS Trainings": 0,
  },
  {
    date: "Apr 22",
    "Change Requests": "3",
    "Sitemaps": "3",
    "CMS Trainings": 0,
  },
  {
    date: "May 22",
    "Change Requests": "4",
    "Sitemaps": "3",
    "CMS Trainings": 1,
  },
  {
    date: "Jun 22",
    "Change Requests": "5",
    "Sitemaps": "4",
    "CMS Trainings": 2,
  },
];

const BarChartComponent = () => {

  return (
    <>
      <Card className="mt-4">
        <Title>Bar Chart Working Stats</Title>
        <BarChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          categories={['Change Requests', 'Sitemaps', 'CMS Trainings']}
          colors={['indigo', "cyan", "fuchsia"]}
        />
      </Card>
    </>
  );
};

export default BarChartComponent;
