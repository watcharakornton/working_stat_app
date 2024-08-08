import React from 'react';
import {
  ExternalLinkIcon,
  ArrowUpIcon,
  ChartBarIcon,
  CodeIcon,
  TableIcon,
  ChartSquareBarIcon,
  PlusCircleIcon
} from "@heroicons/react/solid";

const Sidebar = () => {
  return (
    <div className="bg-slate-800 flex-none w-14 sm:w-20 h-screen">
      <div className="h-20 items-center flex">
        <CodeIcon width={40} className="text-gray-300 left-3 sm:left-6 fixed" />
      </div>
      <div className="fixed left-3 sm:left-6 top-[100px]">
        <a href="/">
          <ChartSquareBarIcon
            width={40}
            className="bg-slate-600 hover:bg-slate-500 p-2 rounded-lg mb-4 text-gray-300"
          />
        </a>
        <a href="/view-data">
          <TableIcon
            width={40}
            className="bg-slate-600 hover:bg-slate-500 p-2 rounded-lg mb-4 text-gray-300"
          />
        </a>
        <a href="/create-data">
          <PlusCircleIcon
            width={40}
            className="bg-slate-600 hover:bg-slate-500 p-2 rounded-lg mb-4 text-gray-300"
          />
        </a>
      </div>
      <div className="fixed bottom-4 left-3 sm:left-6">
        <a href="#top">
          <ArrowUpIcon
            width={40}
            className="bg-slate-600 hover:bg-slate-500 p-2 rounded-lg mb-4 text-gray-300"
          />
        </a>
        <a href="https://3.basecamp.com/3634749/projects" target="_blank">
          <ExternalLinkIcon
            width={40}
            className="bg-slate-600 hover:bg-slate-500 p-2 rounded-lg mb-4 text-gray-300"
          />
        </a>
      </div>
    </div>
  )
}

export default Sidebar;
