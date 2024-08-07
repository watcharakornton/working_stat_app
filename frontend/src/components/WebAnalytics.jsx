import React, { useState, useEffect } from 'react'
import { BarList, Card, Title, Bold, Flex, Text, Divider } from '@tremor/react';
import { getData } from '../api/api';

const WebAnalytics = () => {
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
    <Card className="max-w-full my-4" decoration="top" decorationColor="slate">
      <Title>Overview</Title>
      <Divider />
      <Flex className="mt-4">
        <Text>
          <Bold>Task</Bold>
        </Text>
        <Text>
          Numbers
        </Text>
      </Flex>
      <BarList data={result} className="mt-2"/>
    </Card>
  );
};

export default WebAnalytics;
