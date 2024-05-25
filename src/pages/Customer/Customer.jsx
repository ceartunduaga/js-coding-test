import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { CustomizedBreadcrumbs } from "../../components/Breadcrumbs";
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

export const Customer = () => {
  const { customerName } = useParams();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const customerOrders = orders
    .filter(order => order.CustomerName === customerName)
    .map(order => ({ 
      ...order, 
      id: order.OrderId,
      Date: moment(order.Date).format('MMMM Do YYYY, h:mm a')
    }));
  console.log(customerOrders)

  const columns = [
    { field: 'OrderId', headerName: 'Order ID', flex: 1 },
    { field: 'Date', headerName: 'Date', flex: 2 },
    { field: 'Total', headerName: 'Total', flex: 1 },
  ];
  const totalSum = customerOrders.reduce((sum, order) => sum + parseFloat(order.Total.replace('$', '')), 0);

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <CustomizedBreadcrumbs currentPage={`${customerName}'s Order History`} />
      <Typography variant="h4">{customerName}'s Order History</Typography>
      
      <DataGrid
        rows={customerOrders}
        columns={columns}
        pageSize={customerOrders.length}
        autoHeight 
        pagination={false}
        components={{
          Footer: () => (
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem 1rem', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
              Total: $ {totalSum.toFixed(2)}
            </div>
          )
        }}
      />
    </div>
  );
};

export default Customer;