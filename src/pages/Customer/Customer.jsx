import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { CustomizedBreadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import Row from './CustomerRow';

export const Customer = () => {
  const { customerName } = useParams();
  const { orders } = useSelector((state) => state.orders);
  const customerOrders = orders
    .filter(order => order.CustomerName === customerName);
  const ccyFormat = (num) => `$ ${num.toFixed(2)}`;

  const totalSum = customerOrders.reduce((sum, order) => sum + parseFloat(order.Total.replace('$', '')), 0);

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <CustomizedBreadcrumbs currentPage={`${customerName}'s Order History`} />
      <Typography variant="h4" sx={{ mb: 2 }}>{customerName}'s Order History</Typography>

      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerOrders.map((row) => (
            <Row key={row.OrderId} row={row} />
          ))}
          <TableRow>
            <TableCell rowSpan={1} colSpan={2}/>
            <TableCell colSpan={1} align="right">Sum Of Total Orders:</TableCell>
            <TableCell align="right">{ccyFormat(totalSum)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default Customer;