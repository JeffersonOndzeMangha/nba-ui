import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Players } from '../pages/players';
import { PlayersStateProps } from '../store/reducers/playersSlice';

describe('Players Component', () => {
    let store: any;
    let initialState: PlayersStateProps;
  beforeEach(() => {
    initialState = {
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
        useAppSelector: jest.fn(() => initialState),
        dispatch: jest.fn(),
        subscribe: jest.fn()
      };
  });

  // it('renders the Players component correctly', async () => {
  //   render(
  //       <Provider store={store}>
  //         <Players />
  //       </Provider>
  //     );
    
  //     // Wait for the component to render or data to load
  //     await waitFor(() => {
  //       const playersElement = screen.getByTestId('players');
  //       expect(playersElement).toBeInTheDocument();
  //     });
  // });

  it('handles the error state correctly', async () => {

    render(
        <Provider store={store}>
          <Players />
        </Provider>
      );
    
      // Wait for the component to render or data to load
      await waitFor(() => {
        const playersElement = screen.getByTestId('players');
        expect(playersElement).toBeInTheDocument();
      });
  }
    );

});
