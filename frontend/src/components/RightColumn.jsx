import React from 'react';
import PieChartComponent from './PieChartComponent'
import BarListComponent from './BarListComponent'
import BarChartTwoComponet from './BarChartTwoComponent'

const RightColumn = () => {
  return (
    <div className="w-full p-2 mr-5">
      <PieChartComponent />
      <BarListComponent />
      <BarChartTwoComponet />
    </div>
  );
};

export default RightColumn;
