import React, { useState, useEffect } from 'react';
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
  Divider,
  Select,
  SelectItem,
  TextInput // นำเข้า TextInput สำหรับช่องค้นหา
} from "@tremor/react";
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getData } from '../api/api';
import { SearchIcon } from "@heroicons/react/solid";

const TableComponent = () => {
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State สำหรับค้นหา

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('/view/all');
        setResult(response);
        setFilteredResult(response);  // Set initial filtered result
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = result;

    if (typeFilter) {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (monthFilter) {
      filtered = filtered.filter(item => item.month === monthFilter);
    }

    // ค้นหาข้อมูลตามคำค้นหา
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      filtered = filtered.filter(item =>
        regex.test(item.name) ||
        regex.test(item.type) ||
        regex.test(item.category) ||
        regex.test(item.month) ||
        regex.test(item.year) ||
        regex.test(item.saleStatus)
      );
    }

    setFilteredResult(filtered);
  }, [typeFilter, categoryFilter, monthFilter, searchTerm, result]);

  // คำนวณค่าเฉพาะสำหรับตัวกรอง
  const getUniqueValues = (field) => {
    const uniqueValues = [...new Set(result.map(item => item[field]))];
    return uniqueValues;
  };

  // อัปเดตตัวเลือกตามตัวกรองที่เลือก
  const getFilteredOptions = (field) => {
    let options = getUniqueValues(field);
    if (field === 'category' && typeFilter) {
      options = options.filter(value => result.some(item => item.type === typeFilter && item.category === value));
    }
    if (field === 'month' && typeFilter) {
      options = options.filter(value => result.some(item => item.type === typeFilter && item.month === value));
    }
    return options;
  };

  const uniqueTypes = getUniqueValues('type');
  const filteredCategories = getFilteredOptions('category');
  const filteredMonths = getFilteredOptions('month');

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResult.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Card className="mt-4" decoration="top" decorationColor="slate">
      <Title className="text-center text-2xl text-slate-500">All working data</Title>
      <Divider />
      
      {/* Filter Section */}
      <div className="mb-4 p-4">
        <div className="flex space-x-4 mb-4 justify-end">
          <TextInput
            icon={SearchIcon}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs"
          />
        </div>

        <div className="flex space-x-4">
          <Select
            placeholder="Select Type"
            value={typeFilter}
            onValueChange={setTypeFilter}
            className="w-1/3"
          >
            <SelectItem value="">All Types</SelectItem>
            {uniqueTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Select Category"
            value={categoryFilter}
            onValueChange={setCategoryFilter}
            className="w-1/3"
          >
            <SelectItem value="">All Categories</SelectItem>
            {filteredCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Select Month"
            value={monthFilter}
            onValueChange={setMonthFilter}
            className="w-1/3"
          >
            <SelectItem value="">All Months</SelectItem>
            {filteredMonths.map(month => (
              <SelectItem key={month} value={month}>{month}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Month</TableHeaderCell>
            <TableHeaderCell>Year</TableHeaderCell>
            <TableHeaderCell>Sale Status</TableHeaderCell>
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
                <Text>{item.month}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.year}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.saleStatus}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <p className="text-tremor-content text-sm">
          Page <span className="font-medium">{currentPage + 1}</span> of <span className="font-medium">{Math.ceil(filteredResult.length / itemsPerPage)}</span>
        </p>
        <div className="flex space-x-2">
          <ReactPaginate
            previousLabel={<FaChevronLeft />}
            nextLabel={<FaChevronRight />}
            pageCount={Math.ceil(filteredResult.length / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName="flex space-x-2"
            pageClassName="flex items-center justify-center w-10 h-10 bg-[#1e293b] border border-[#1e293b] rounded-full cursor-pointer hover:bg-[#334155]"
            pageLinkClassName="text-white"
            previousClassName="flex items-center justify-center w-10 h-10 bg-[#1e293b] border border-[#1e293b] rounded-full cursor-pointer hover:bg-[#334155]"
            previousLinkClassName="text-white"
            nextClassName="flex items-center justify-center w-10 h-10 bg-[#1e293b] border border-[#1e293b] rounded-full cursor-pointer hover:bg-[#334155]"
            nextLinkClassName="text-white"
            breakClassName="flex items-center justify-center w-10 h-10 bg-[#1e293b] border border-[#1e293b] rounded-full cursor-pointer hover:bg-[#334155]"
            breakLinkClassName="text-white"
            activeClassName="bg-[#334155] text-white"
            activeLinkClassName="text-white" // Ensure the active page number is also clickable
          />
        </div>
      </div>
    </Card>
  );
};

export default TableComponent;
