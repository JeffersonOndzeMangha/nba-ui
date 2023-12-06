import playersReducer, { PlayersStateProps } from './playersSlice';

describe('players reducer', () => {
  const initialState: PlayersStateProps = {
    players: {},
    favoritePlayers: {},
    filteredPlayers: {},
    filters: {},
    view: 'all',
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(playersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // it('should handle increment', () => {
  //   const actual = playersReducer(initialState, increment());
  //   expect(actual.value).toEqual(4);
  // });

  // it('should handle decrement', () => {
  //   const actual = playersReducer(initialState, decrement());
  //   expect(actual.value).toEqual(2);
  // });

  // it('should handle incrementByAmount', () => {
  //   const actual = playersReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });
});
