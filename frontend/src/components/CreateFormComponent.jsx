import React, { useState } from 'react';
import { TextInput, Select, Button, Title, Card } from '@tremor/react';
import axios from 'axios';

const CreateFormComponent = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      type,
      name,
      category,
      month
    };

    try {
      await axios.post('http://localhost:4000/api/add', data);
      alert('Data added successfully');
      // Optionally, clear the form fields here
      setType('');
      setName('');
      setCategory('');
      setMonth('');
    } catch (error) {
      console.error('Error adding data:', error);
      alert('Failed to add data');
    }
  };

  return (
    <Card className="mt-4" decoration="top" decorationColor="slate">
      <Title>Create Data</Title>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex-1">
            <TextInput
              label={<span className="text-slate-500">Name</span>}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Select
              label={<span className="text-slate-500">Month</span>}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </Select>
          </div>
        </div>

        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <Select
              label={<span className="text-slate-500">Type</span>}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Change Request">Change Request</option>
              <option value="Sitemap">Sitemap</option>
              <option value="CMS Training">CMS Training</option>
            </Select>
          </div>

          <div className="flex-1">
            <Select
              label={<span className="text-slate-500">Category</span>}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="WD">WD</option>
              <option value="IR">IR</option>
              <option value="WD/IR">WD/IR</option>
              <option value="CG">CG</option>
              <option value="SD">SD</option>
              <option value="INT">INT</option>
            </Select>
          </div>
        </div>

        <Button type="submit" className="float-right">Submit</Button>
      </form>
    </Card>
  );
};

export default CreateFormComponent;
