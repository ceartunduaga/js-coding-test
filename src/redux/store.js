import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './reducers/ordersReducer';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export default store