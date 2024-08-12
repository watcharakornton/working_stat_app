import React from 'react';
import Sidebar from '../components/Sidebar';
import TableComponent from '../components/TableComponent'

import { Legend, Divider, TextInput, Select, SelectItem, Button, Title, Card } from '@tremor/react';
import { updateData } from '../api/api';

const EditDataPage = () => {

  return (
    <main className="flex ">
      <Sidebar />
      <div className="mt-5 flex flex-col mx-auto max-w-2xl flex-1 relative">
        <Card className="mt-4" decoration="top" decorationColor="indigo">
          <Title>Edit Data</Title>
        </Card>
      </div>
    </main>
  )
}

export default EditDataPage;
