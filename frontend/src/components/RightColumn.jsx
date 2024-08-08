import React from 'react';
import PieChartComponent from './PieChartComponent'
import BarListComponent from './BarListComponent'
import ListItemComponent from './ListItemComponent'

const RightColumn = () => {
  return (
    <div className="w-full p-2">
      <PieChartComponent />
      <BarListComponent />
      <ListItemComponent />
    </div>
  );
};

export default RightColumn;
