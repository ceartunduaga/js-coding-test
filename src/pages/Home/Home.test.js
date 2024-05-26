import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Home from './Home';

const mockStore = configureStore([]);
const initialState = {
  orders: {
    orders: [
      {
        OrderId: 1,
        CustomerId: 1,
        CustomerName: "Elizabeth",
        Total: "$30.00",
        Date: "2021-02-01 08:30:00.000",
        Items: [
          { Item: "Candle", ItemPrice: "$3.00", Quantity: "3" },
          { Item: "Book", ItemPrice: "$15.00", Quantity: "1" },
          { Item: "Pen", ItemPrice: "$0.75", Quantity: "1" },
          { Item: "Paper", ItemPrice: "$5.25", Quantity: "1" },
        ],
      },
      {
        OrderId: 2,
        CustomerId: 2,
        CustomerName: "Alexander",
        Total: "$52.50",
        Date: "2021-02-02 10:00:00.000",
        Items: [
          { Item: "Book", ItemPrice: "$15.00", Quantity: "1" },
          { Item: "Jar", ItemPrice: "$12.50", Quantity: "3" },
        ],
      },
    ],
    loading: false,
    error: null,
  },
};

describe('Home component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
