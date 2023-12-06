import playersReducer, { PlayersStateProps } from '../store/playersSlice';

describe('players reducer', () => {
  const initialState: PlayersStateProps = {
    players: {},
    favoritePlayers: {},
    filteredPlayers: {},
    filters: {},
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(playersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  
});
