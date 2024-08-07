import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  DonutChart,
  Flex,
  TabGroup,
  Tab,
  TabList,
  Bold,
  Divider,
  List,
  ListItem,
  Text,
  Title,
} from '@tremor/react';
import { ChartPieIcon } from '@heroicons/react/outline';
import { getData } from '../api/api';

const dataFormatter = (number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

const SalesItem = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('/view/summary-type');
        setResult(response);
      } catch (err) {
        setError(err);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="max-w-full mx-auto" decoration="top" decorationColor="slate">
      <Flex className="space-x-8 flex-col lg:flex-row">
        <Title>Overview</Title>
        <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
          <TabList variant="solid">
            <Tab icon={ChartPieIcon}>Donut</Tab>
            <Tab icon={ChartPieIcon}>Pie</Tab>
          </TabList>
        </TabGroup>
      </Flex>
      <Divider />
      <Flex justifyContent="between">
        {result.map((item, index) => (
          <Text key={index}>{item.name}: {item.value}</Text>
        ))}
      </Flex>
      <Divider />
      {selectedIndex === 0 ? (
        <DonutChart
          data={result}
          variant="donut"
          valueFormatter={dataFormatter}
          showAnimation={false}
          category="value"
          index="name"
          className="mt-6"
          colors={['indigo', 'cyan', 'fuchsia']}
        />
      ) : (
        <DonutChart
          data={result}
          variant="pie"
          valueFormatter={dataFormatter}
          showAnimation={false}
          category="value"
          index="name"
          className="mt-6"
          colors={['indigo', 'cyan', 'fuchsia']}
        />
      )}
    </Card>
  );
};

export default SalesItem;
