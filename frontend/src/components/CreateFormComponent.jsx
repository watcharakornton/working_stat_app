import React, { useState } from 'react';
import { Legend, Divider, TextInput, Select, SelectItem, Button, Title, Card } from '@tremor/react';
import axios from 'axios';

const CreateFormComponent = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [saleStatus, setSaleStatus] = useState(''); // State สำหรับ saleStatus

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      type,
      name,
      category,
      month,
      ...(type === 'Sitemap' && { saleStatus }) // เพิ่ม saleStatus ถ้า type เป็น 'Sitemap'
    };

    try {
      await axios.post('http://localhost:4000/api/add', data);
      alert('Data added successfully');
      // Clear the form fields here
      setType('');
      setName('');
      setCategory('');
      setMonth('');
      setSaleStatus('');
    } catch (error) {
      console.error('Error adding data:', error);
      alert('Failed to add data');
    }
  };

  return (
    <Card className="mt-4" decoration="top" decorationColor="slate">
      <Title>Create Data</Title>
      <Divider />
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="text-sm text-slate-500"
            >Name</label>
            <TextInput
              id="name"
              value={name}
              onValueChange={setName}
              className="mt-2"
            />
          </div>
        </div>

        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="month"
              className="text-sm text-slate-500"
            >
              Month
            </label>
            <Select
              id="month"
              value={month}
              onValueChange={setMonth}
              className="mt-2"
            >
              <SelectItem value="">Select Month</SelectItem>
              <SelectItem value="Jan">January</SelectItem>
              <SelectItem value="Feb">February</SelectItem>
              <SelectItem value="Mar">March</SelectItem>
              <SelectItem value="Apr">April</SelectItem>
              <SelectItem value="May">May</SelectItem>
              <SelectItem value="Jun">June</SelectItem>
              <SelectItem value="Jul">July</SelectItem>
              <SelectItem value="Aug">August</SelectItem>
              <SelectItem value="Sep">September</SelectItem>
              <SelectItem value="Oct">October</SelectItem>
              <SelectItem value="Nov">November</SelectItem>
              <SelectItem value="Dec">December</SelectItem>
            </Select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="type"
              className="text-sm text-slate-500"
            >
              Type
            </label>
            <Select
              id="type"
              value={type}
              onValueChange={setType}
              className="mt-2"
            >
              <SelectItem value="">Select Type</SelectItem>
              <SelectItem value="Change Request">Change Request</SelectItem>
              <SelectItem value="Sitemap">Sitemap</SelectItem>
              <SelectItem value="CMS Training">CMS Training</SelectItem>
            </Select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="category"
              className="text-sm text-slate-500"
            >
              Category
            </label>
            <Select
              id="category"
              value={category}
              onValueChange={setCategory}
              className="mt-2"
            >
              <SelectItem value="">Select Category</SelectItem>
              <SelectItem value="WD">WD</SelectItem>
              <SelectItem value="IR">IR</SelectItem>
              <SelectItem value="WD/IR">WD/IR</SelectItem>
              <SelectItem value="CG">CG</SelectItem>
              <SelectItem value="SD">SD</SelectItem>
              <SelectItem value="INT">INT</SelectItem>
            </Select>
          </div>
        </div>
        {type === 'Sitemap' && (
          <div className="mb-4 flex-1">
            <label
              htmlFor="saleStatus"
              className="text-sm text-slate-500"
            >
              Sale Status
            </label>
            <Select
              id="saleStatus"
              value={saleStatus}
              onValueChange={setSaleStatus}
              className="mt-2"
            >
              <SelectItem value="">Select Sale Status</SelectItem>
              <SelectItem value="YES">YES</SelectItem>
              <SelectItem value="NO">NO</SelectItem>
              <SelectItem value="TBC">TBC</SelectItem>
            </Select>
          </div>
        )}

        <Divider />
        <Button type="submit" className="float-right">Add data</Button>
      </form>
    </Card>
  );
};

export default CreateFormComponent;
