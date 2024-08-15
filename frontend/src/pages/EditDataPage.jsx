import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Legend, Divider, TextInput, Select, SelectItem, Button, Title, Card } from '@tremor/react';
import { updateData } from '../api/api';

const EditDataPage = () => {
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการเปลี่ยนเส้นทาง
  const location = useLocation();
  const { data } = location.state || {};
  
  const [type, setType] = useState(data?.type || '');
  const [name, setName] = useState(data?.name || '');
  const [category, setCategory] = useState(data?.category || '');
  const [month, setMonth] = useState(data?.month || '');
  const [saleStatus, setSaleStatus] = useState(data?.saleStatus || '');

  if (!data) {
    return (
      <main className="flex">
        <Sidebar />
        <div className="mt-5 flex flex-col mx-auto max-w-2xl flex-1 relative">
          <Card className="mt-4" decoration="top" decorationColor="indigo">
            <Title>Edit Data</Title>
          </Card>
        </div>
      </main>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // รวมข้อมูลเดิมกับข้อมูลใหม่ถ้าข้อมูลใหม่เป็นค่าว่าง
    const formData = {
      name: name || data.name,
      category: category || data.category,
      month: month || data.month,
      ...(type === 'Sitemap' && { saleStatus: saleStatus || data.saleStatus }) // เพิ่ม saleStatus ถ้า type เป็น 'Sitemap'
    };

    try {
      await updateData('/update', data._id, formData);
      alert('Data updated successfully');
      navigate('/view-data'); // เปลี่ยนเส้นทางไปยัง /view-data
    } catch (error) {
      alert('Failed to update data');
    }
  };

  return (
    <main className="flex">
      <Sidebar />
      <div className="flex flex-col mx-auto max-w-2xl flex-1 relative">
        <Card className="mt-4" decoration="top" decorationColor="slate">
          <Title>Edit Data</Title>
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
                  placeholder={data.name}
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
                  placeholder={data.month}
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
                  placeholder={data.type}
                  disabled // ปิดการใช้งาน select นี้
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
                  placeholder={data.category}
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
                  placeholder={data.saleStatus}
                >
                  <SelectItem value="">Select Sale Status</SelectItem>
                  <SelectItem value="YES">YES</SelectItem>
                  <SelectItem value="NO">NO</SelectItem>
                  <SelectItem value="TBC">TBC</SelectItem>
                </Select>
              </div>
            )}

            <Divider />
            <Button type="submit" className="float-right">Edit data</Button>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default EditDataPage;
