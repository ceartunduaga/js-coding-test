import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


export const BarChartCustome = ({order}) => {
  
  const orderData = order?.map(item => item.orders);
  const revenueData = order?.map(item => item.revenue);
  const customerLabels = order?.map(item => item.customer);


  if(!order || order.length === 0) {
    return null;
  }
  
  return (
    <BarChart
      
      height={400}
      xAxis={[{ data: customerLabels, scaleType: 'band' }]}
      series={[
        {
          data: orderData,
          color: 'rgba(75, 192, 192, 0.6)',
          label: 'Total Orders',
        },
        {
          data: revenueData,
          color: 'rgba(54, 162, 235, 0.6)',
          label: 'Total Revenues',
          valueFormatter: (value) => `$${value}`,
        },
      ]}
    />
  );
}