import React from 'react';
import Sidebar from '../components/Sidebar';
import CreateFormComponent from '../components/CreateFormComponent';

const CreateDataPage = () => {
  return (
    <main className="flex ">
      <Sidebar />
      <div className="flex flex-col mx-auto max-w-2xl flex-1 relative">
        <CreateFormComponent />
      </div>
    </main>
  )
}

export default CreateDataPage;
