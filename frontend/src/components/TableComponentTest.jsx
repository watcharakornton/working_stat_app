import React, { useState, useEffect } from 'react';
import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text, Title } from "@tremor/react";
import { getData } from '../api/api';
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TableComponent = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('/view/all');
        console.log('API response:', response);
        setResult(response);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };
    fetchData();
  }, []);

  // Calculate the items to display on the current page
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Card className="mt-4">
      <Title>All working data</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Sale Status</TableHeaderCell>
            <TableHeaderCell>Month</TableHeaderCell>
            <TableHeaderCell>Year</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text>{item.type}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.category}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.saleStatus}</Text>
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
      <div className="flex items-center justify-between mt-4">
        <p className="text-tremor-content text-sm">
          Page <span className="font-medium">{currentPage + 1}</span> of <span className="font-medium">{Math.ceil(result.length / itemsPerPage)}</span>
        </p>
        <div className="flex space-x-2">
          <ReactPaginate
            previousLabel={<FaChevronLeft />}
            nextLabel={<FaChevronRight />}
            pageCount={Math.ceil(result.length / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName="flex space-x-2"
            pageClassName="flex items-center justify-center w-10 h-10 bg-[#1e293b] border border-[#1e293b] rounded-full cursor-pointer"
            pageLinkClassName="text-white"
            previousClassName="flex items-center justify-center w-10 h-10 bg-[#1e293b] border border-[#1e293b] rounded-full cursor-pointer"
            previousLinkClassName="text-white"
            nextClassName="flex items-center justify-center w-10 h-10 bg-[#1e293b] border border-[#1e293b] rounded-full cursor-pointer"
            nextLinkClassName="text-white"
            breakClassName="flex items-center justify-center w-10 h-10 bg-[#1e293b] border border-[#1e293b] rounded-full cursor-pointer"
            breakLinkClassName="text-white"
            activeClassName="bg-[#334155] text-white"
          />
        </div>
      </div>
    </Card>
  );
};

export default TableComponent;
