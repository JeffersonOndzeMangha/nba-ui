import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store/store';

describe('Players Component', () => {
  beforeEach(() => {

  });

  it('renders the Players component correctly', async () => {
    render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    
      // Wait for the component to render or data to load
      await waitFor(() => {
        const playersElement = screen.getByTestId('app');
        expect(playersElement).toBeInTheDocument();
      });
  });

});
