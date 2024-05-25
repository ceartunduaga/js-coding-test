export const fetchOrders = () => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_ORDERS_REQUEST' });
  
      try {
        const response = await fetch('/content/receipts.json');
        const data = await response.json();
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ORDERS_FAILURE', payload: error.message });
      }
    };
  };