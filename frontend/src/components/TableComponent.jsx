import React from 'react'
import { StatusOnlineIcon } from '@heroicons/react/outline'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react"

const data = [
  {
    name: "KEX: Change company's name",
    type: "Change Requests",
    category: "WD",
    month: "Jun",
    year: "2024"
  },
  {
    name: "KEX: Change company's name",
    type: "Change Requests",
    category: "WD",
    month: "Jun",
    year: "2024"
  },
  {
    name: "KEX: Change company's name",
    type: "Change Requests",
    category: "WD",
    month: "Jun",
    year: "2024"
  },
  {
    name: "KEX: Change company's name",
    type: "Change Requests",
    category: "WD",
    month: "Jun",
    year: "2024"
  },
];

const TableComponent = () => {
  return (
    <Card className="mt-4">
      <Title>All working data</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Month</TableHeaderCell>
            <TableHeaderCell>Year</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text>{item.type}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.category}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.month}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.year}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TableComponent;
