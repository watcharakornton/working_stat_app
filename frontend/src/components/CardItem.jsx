import React from "react";
import { Card, Flex, Metric, Text, Divider } from "@tremor/react";

const CardItem = ({ title, data, decorationColor }) => {
  return (
    <Card className="w-xs" decoration="top" decorationColor={decorationColor}>
      <Text className="text-xl text-center text-slate-500">{title}</Text>
      <Divider></Divider>
      <Metric className="text-4xl text-center my-2">{data}</Metric>
    </Card>
  );
};

export default CardItem;
