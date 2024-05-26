import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { CustomizedBreadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { DataGrid } from '@mui/x-data-grid';

const Item = () => {
  const { itemName } = useParams();
  const { orders } = useSelector((state) => state.orders);
  const itemOrders = orders.flatMap(order =>
    order.Items.filter(item => item.Item === itemName).map(item => ({
      ...item,
      id: order.OrderId,
      date: moment(order.Date).format('MMMM Do YYYY, h:mm a'),
      customer: order.CustomerName,
      price: parseFloat(item.ItemPrice.replace('$', '')) * item.Quantity
    }))
  );

  const columns = [
    { field: 'id', headerName: 'Order ID', flex: 1 },
    { field: 'customer', headerName: 'Customer', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 2 },
    {
      field: 'Quantity', headerName: 'Quantity', flex: 2,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'ItemPrice', headerName: 'Unit', flex: 2,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'price', headerName: 'Sun', flex: 1,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    }
  ];

  const total = itemOrders.reduce((acc, row) => acc + row.price, 0);

  return (
    <Box>
      <CustomizedBreadcrumbs currentPage={`Order History for ${itemName}`} />
      <Typography variant="h4">Order History for {itemName}</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>Number of times ordered: {itemOrders.length}</Typography>
      <DataGrid
        rows={itemOrders}
        columns={columns}
        pageSize={itemOrders.length}
        autoHeight
        components={{
          Footer: () => (
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem 1rem', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
              Total: $ {total.toFixed(2)}
            </div>
          )
        }}
      />
    </Box>
  );
};

export default Item