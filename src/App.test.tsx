import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { PlayersStateProps } from './app/store/playersSlice';

describe('Players Component', () => {
    let store: any;
  beforeEach(() => {
    const initialState: PlayersStateProps = {
        players: {},
        filteredPlayers: {},
        favoritePlayers: {},
        currentMeta: {},
        newMeta: {},
        status: 'idle',
        error: null
      };

    store = {
        getState: jest.fn(() => initialState),
        dispatch: jest.fn(),
        subscribe: jest.fn()
      };
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
