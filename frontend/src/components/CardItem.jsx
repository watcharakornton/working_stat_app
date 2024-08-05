import React from "react";
import { Badge, Card, Flex, Metric } from "@tremor/react";

const CardItem = ({ title, data }) => {
  return (
    <Card className="w-xs" decoration="top" decorationColor="indigo">
      <Flex justifyContent="between" alignItems="center">
        <Badge>{title}</Badge>
        <Metric>{data}</Metric>
      </Flex>
    </Card>
  );
};

export default CardItem;
