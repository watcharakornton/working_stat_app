import React, { useState, useEffect } from 'react';
import { Divider, Card, Flex, List, Bold, ListItem, Title, Text } from '@tremor/react';
import { getData } from '../api/api';

const cities = [
  {
    city: "Athens",
    rating: "2 open PR",
  },
  {
    city: "Luzern",
    rating: "1 open PR",
  },
  {
    city: "Zürich",
    rating: "0 open PR",
  },
  {
    city: "Vienna",
    rating: "1 open PR",
  },
  {
    city: "Ermatingen",
    rating: "0 open PR",
  },
  {
    city: "Lisbon",
    rating: "0 open PR",
  },
]

const ScoreList = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('/view/summary-type-category');
        console.log(response)
        setResult(response);
      } catch (err) {
        setError(err);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="max-w-full">
      <Title>Overview</Title>
      <Divider>by Category</Divider>
      <List>
        {result.map((item, index) => (
          <ListItem key={index}>
            <span>{item.name} [WD:IR]</span>
            <span>{item.value_wd} : {item.value_ir}</span>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default ScoreList;
