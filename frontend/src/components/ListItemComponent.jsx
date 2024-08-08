import React, { useState, useEffect } from 'react';
import { Divider, Card, Flex, List, Bold, ListItem, Title, Text } from '@tremor/react';
import { getData } from '../api/api';

const ListItemComponent = () => {
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

export default ListItemComponent;
