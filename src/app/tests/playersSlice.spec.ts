import playersReducer, { PlayersStateProps } from '../store/playersSlice';

describe('players reducer', () => {
  const initialState: PlayersStateProps = {
    players: {},
    favoritePlayers: {},
    filteredPlayers: {},
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(playersReducer(initialState, { type: 'unknown' })).toEqual({
      players: {},
      favoritePlayers: {},
      filteredPlayers: {},
      status: 'idle',
      error: null,
    });
  });

  it('should handle setPlayers', () => {
    const actual = playersReducer(initialState, {
      type: 'players/setPlayers',
      payload: [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          position: 'G',
          height_feet: 6,
          height_inches: 5,
          weight_pounds: 200,
        },
      ],
    });
    expect(actual.players).toEqual({
      1: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        position: 'G',
        height_feet: 6,
        height_inches: 5,
        weight_pounds: 200,
      },
    });
  });

  it('should handle addToFavorites', () => {
    const actual = playersReducer(initialState, {
      type: 'players/addToFavorites',
      payload: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        position: 'G',
        height_feet: 6,
        height_inches: 5,
        weight_pounds: 200,
      },
    });
    expect(actual.favoritePlayers).toEqual({
      1: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        position: 'G',
        height_feet: 6,
        height_inches: 5,
        weight_pounds: 200,
      },
    });
  });

  it('should handle removeFromFavorites', () => {
    const actual = playersReducer(
      {
        ...initialState,
        favoritePlayers: {
          1: {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            position: 'G',
            height_feet: 6,
            height_inches: 5,
            weight_pounds: 200,
            team: {
              id: 1,
              abbreviation: 'BOS',
              city: 'Boston',
              conference: 'East',
              division: 'Atlantic',
              full_name: 'Boston Celtics',
              name: 'Celtics',
            }
          },
        },
      },
      {
        type: 'players/removeFromFavorites',
        payload: {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          position: 'G',
          height_feet: 6,
          height_inches: 5,
          weight_pounds: 200,
        },
      }
    );
    expect(actual.favoritePlayers).toEqual({});
  });

  it('should handle setMeta', () => {
    const actual = playersReducer(initialState, {
      type: 'players/setMeta',
      payload: {
        total_pages: 1,
        current_page: 1,
        next_page: null,
        per_page: 25,
        total_count: 25,
      },
    });
    expect(actual.currentMeta).toEqual({
      total_pages: 1,
      current_page: 1,
      next_page: null,
      per_page: 25,
      total_count: 25,
    });
  });

  it('should handle setNewMeta', () => {
    const actual = playersReducer(initialState, {
      type: 'players/setNewMeta',
      payload: {
        total_pages: 1,
        current_page: 1,
        next_page: null,
        per_page: 25,
        total_count: 25,
      },
    });
    expect(actual.newMeta).toEqual({
      total_pages: 1,
      current_page: 1,
      next_page: null,
      per_page: 25,
      total_count: 25,
    });
  });

});
