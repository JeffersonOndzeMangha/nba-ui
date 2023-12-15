import {
  playersSlice,
  setPlayers,
  addToFavorites,
  removeFromFavorites,
  setMeta,
  setNewMeta,
  resetError,
  PlayersStateProps,
} from '../store/reducers/playersSlice';
import { Player } from '../types/Player';

describe('playersSlice', () => {
  let initialState: PlayersStateProps;
  let player1: Player;
  let player2: Player;

  beforeAll(() => {
    initialState = {
      players: {},
      filteredPlayers: {},
      favoritePlayers: {},
      currentMeta: {},
      newMeta: {},
      status: 'idle',
      error: null,
    };

    player1 = {
      id: 1,
      first_name: 'Player',
      last_name: 'Player 1',
      position: 'PG',
      height_feet: 6,
      height_inches: 3,
      weight_pounds: 200,
      team: {
        id: 1,
        abbreviation: 'PHI',
        city: 'Philadelphia',
        conference: 'East',
        division: 'Atlantic',
        full_name: 'Philadelphia 76ers',
        name: '76ers',
      },
    }
    player2 = {
      id: 2,
      first_name: 'Player',
      last_name: 'Player 2',
      position: 'PG',
      height_feet: 6,
      height_inches: 3,
      weight_pounds: 200,
      team: {
        id: 2,
        abbreviation: 'PHI',
        city: 'Philadelphia',
        conference: 'East',
        division: 'Atlantic',
        full_name: 'Philadelphia 76ers',
        name: '76ers',
      },
    };
  });
  
  it('should handle setPlayers with initial state', () => {
    const action = setPlayers([player1, player2]);

    const newState = playersSlice.reducer(initialState, action);

    expect(newState.players).toEqual({
      1: player1,
      2: player2,
    });
  });

  it('should handle addToFavorites with initial state', () => {

    const action = addToFavorites(player1);

    const newState = playersSlice.reducer(initialState, action);

    expect(newState.players).toEqual({});
    expect(newState.favoritePlayers).toEqual({
      1: player1,
    });
  });

  it('should handle removeFromFavorites with initial state', () => {
    const action = removeFromFavorites(player1);

    const newState = playersSlice.reducer(initialState, action);

    expect(newState.favoritePlayers).toEqual({});
  });

  it('should handle setMeta with initial state', () => {
    const meta = { page: 1, per_page: 10 };
    const action = setMeta(meta);

    const newState = playersSlice.reducer(initialState, action);

    expect(newState.currentMeta).toEqual(meta);
  });

  it('should handle setNewMeta with initial state', () => {
    const newMeta = { page: 2, per_page: 20 };
    const action = setNewMeta(newMeta);

    const newState = playersSlice.reducer(initialState, action);

    expect(newState.newMeta).toEqual(newMeta);
  });

  it('should handle resetError with initial state', () => {
    const action = resetError();

    const newState = playersSlice.reducer({...initialState, status: 'failed', error: 'Some error'}, action);

    expect(newState.status).toEqual('idle');
    expect(newState.error).toBeNull();
  });
});
