import React from 'react';

const DataTable = ({ allData }) => {
  return (
    <div className="table-container bg-gray-800 p-4 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Year</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sale Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {allData.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.month}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.year}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.saleStatus || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable
