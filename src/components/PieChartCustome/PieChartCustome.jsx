import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export const PieChartCustome = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const pieData = Object.entries(items).map(([item, quantity], index) => ({
    label: item,
    value: quantity,
    id: index
  }));

  return (
    <PieChart
      series={[
        {
          data: pieData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      width={400}
      height={350}
    />
  );
};