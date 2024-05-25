import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { CustomizedBreadcrumbs } from "../../components/Breadcrumbs";

const Item = () => {
  const { itemName } = useParams();
  const { orders } = useSelector((state) => state.orders);
  const itemOrders = orders.flatMap(order => 
    order.Items.filter(item => item.Item === itemName).map(item => ({
      ...item,
      date: moment(order.Date).format('MMMM Do YYYY, h:mm a'),
      customer: order.CustomerName
    }))
  );

  const rows = itemOrders.map((item, index) => ({
    customer: item.customer,
    date: item.date,
    qty: item.Quantity,
    unit: item.ItemPrice,
    price: parseFloat(item.ItemPrice.replace('$', '')) * item.Quantity
  }));
  const ccyFormat = (num) => `${num.toFixed(2)}`;

  const total = rows.reduce((acc, row) => acc + row.price, 0);

  return (
    <Box p={2}>
      <CustomizedBreadcrumbs currentPage={`Order History for ${itemName}`} />

      <Typography variant="h4">Order History for {itemName}</Typography>
      <Typography variant="h6">Number of times ordered: {itemOrders.length}</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={1} colSpan={3}/>
              <TableCell colSpan={1} align="right">Total</TableCell>
              <TableCell align="right">{ccyFormat(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Item