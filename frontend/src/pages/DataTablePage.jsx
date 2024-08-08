import React from 'react';
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TableComponentTest from '../components/TableComponentTest'

const DataTablePage = () => {
  return (
    <main className="flex ">
      <Sidebar />
      <div className="mt-5 flex flex-col mx-auto max-w-screen-2xl flex-1 relative">
        <TableComponentTest />
      </div>
    </main>
  )
}

export default DataTablePage;
