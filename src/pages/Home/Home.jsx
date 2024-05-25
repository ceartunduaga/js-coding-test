import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
import { fetchOrders } from '../../redux/actions/orderActions';

import styles from './HomePage.module.css';

export default function Home() {

  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + parseFloat(order.Total.replace('$', '')), 0).toFixed(2);
  const uniqueCustomers = [...new Set(orders.map(order => order.CustomerName))];
  const totalUniqueCustomers = uniqueCustomers.length;
  const ordersPerCustomer = orders.reduce((acc, order) => {
    acc[order.CustomerName] = (acc[order.CustomerName] || 0) + 1;
    return acc;
  }, {});
  const itemQuantities = orders.flatMap(order => order.Items).reduce((acc, item) => {
    acc[item.Item] = (acc[item.Item] || 0) + parseInt(item.Quantity);
    return acc;
  }, {});
  const mostSoldItem = Object.keys(itemQuantities).length > 0 
    ? Object.keys(itemQuantities).reduce((a, b) => itemQuantities[a] > itemQuantities[b] ? a : b)
    : 'No items sold';
  const revenuePerCustomer = orders.reduce((acc, order) => {
    acc[order.CustomerName] = (acc[order.CustomerName] || 0) + parseFloat(order.Total.replace('$', ''));
    return acc;
  }, {});
  const bestCustomer = Object.keys(revenuePerCustomer).length > 0 
  ? Object.keys(revenuePerCustomer).reduce((a, b) => revenuePerCustomer[a] > revenuePerCustomer[b] ? a : b)
  : 'No items sold';

  const ordersPerDate = orders.reduce((acc, order) => {
    const date = order.Date.split(' ')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {})

  const customers = [...new Set(orders.map(order => order.CustomerName))];
  const items = [...new Set(orders.flatMap(order => order.Items.map(item => item.Item)))];

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>Order Statistics</Typography>
      <Typography variant="h6">Total Orders: {totalOrders}</Typography>
      <Typography variant="h6">Total Revenue: ${totalRevenue}</Typography>
      <Typography variant="h6">Unique Customers: {totalUniqueCustomers}</Typography>
      <Typography variant="h6">Most Sold Item: {mostSoldItem}</Typography>
      <Typography variant="h6">Best Customer: {bestCustomer}</Typography>
      <Typography variant="h6">Revenue Generated by Best Customer: ${revenuePerCustomer[bestCustomer]?.toFixed(2)}</Typography>

      <Typography variant="h5" mt={4}>Detailed Statistics</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(ordersPerCustomer).map(([customer, count]) => (
              <TableRow key={customer}>
                <TableCell>{customer}</TableCell>
                <TableCell>{count}</TableCell>
                <TableCell>${revenuePerCustomer[customer].toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Orders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(ordersPerDate).map(([date, count]) => (
              <TableRow key={date}>
                <TableCell>{date}</TableCell>
                <TableCell>{count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Typography variant="h5" mt={4}>Customers</Typography>
      <List className={styles.list}>
        {customers.map(customer => (
          <ListItem key={customer} button component={Link} to={`/customer/${customer}`} className={styles['list-item']}>
            <ListItemText primary={customer} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" mt={4}>Items</Typography>
      <List className={styles.list}>
        {items.map(item => (
          <ListItem key={item} button component={Link} to={`/item/${item}`} className={styles['list-item']}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}