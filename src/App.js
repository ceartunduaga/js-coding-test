import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Typography, CircularProgress, Container } from '@mui/material';
import Home from './pages/Home/Home';
import Customer from './pages/Customer/Customer';
import Item from './pages/Item/Item';
import { fetchOrders } from './redux/actions/ordersActions';

function App() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (orders.length === 0 && !loading && !error ) {
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length, loading, error]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h6">Loading...</Typography>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer/:customerName" element={<Customer />} />
      <Route path="/item/:itemName" element={<Item />} />
    </Routes>
  );
}

export default App;
