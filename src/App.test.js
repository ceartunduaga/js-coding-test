import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store'; 
import { act } from 'react-dom/test-utils';

test('renders home link', () => {
  act(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });
  const linkElement = screen.getByText(/Order Statistics/i);
  expect(linkElement).toBeInTheDocument();
});
