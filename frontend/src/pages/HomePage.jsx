import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import LeftColumn from '../components/LeftColumn'
import RightColumn from '../components/RightColumn'

function HomePage() {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 relative">
        <div className="mt-5 grid md:grid-cols-3 grid-cols-1 w-full">
          <div className="col-span-2">
            <LeftColumn />
          </div>
          <div className="w-full">
            <RightColumn />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
