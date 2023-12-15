import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '../store';
import fetchPlayers from '../../api/playersAPI';
import { Player } from '../../types/Player';
import { openError, openSuccess } from './snackbarSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define the shape of the Players state
export interface PlayersStateProps {
  players: {
    [key: number] : Player;
  };
  filteredPlayers:{
    [key: number] : Player;
  };
  favoritePlayers: {
    [key: number] : Player;
  };
  currentMeta?: any;
  newMeta?: any;
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

// Define the initial state for the Players slice
const initialState: PlayersStateProps = {
  players: {},
  filteredPlayers: {},
  favoritePlayers: {},
  currentMeta: {},
  newMeta: {},
  status: 'idle',
  error: null,
};

// Create the Players slice with reducers and actions
export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<any>) => {
      state.players = {
        ...action.payload.reduce((acc: any, player: any) => {
          if (player.id in state.favoritePlayers) {
            return acc;
          }
          acc[player.id] = player;
          return acc;
        }, {})
      };
    },
    addToFavorites: (state, action: PayloadAction<Player>) => {
      state.favoritePlayers[action.payload.id] = action.payload;
      // remove from players list
      delete state.players[action.payload.id];
    },
    removeFromFavorites: (state, action: PayloadAction<Player>) => {
      delete state.favoritePlayers[action.payload.id];
    },
    setMeta: (state, action: PayloadAction<any>) => {
      state.currentMeta = action.payload;
    },
    setNewMeta: (state, action: PayloadAction<any>) => {
      state.newMeta = action.payload;
    },
    resetError: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(fetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

// Export action creators
export const { setPlayers, addToFavorites, removeFromFavorites, setMeta, setNewMeta, resetError } = playersSlice.actions;

// Define a thunk for fetching players
export const fetch = createAsyncThunk(
  'players/fetch',
  async (args: any) => {
    const { search, newMeta } = args;
    try {
    const response = (!!search) ? await fetchPlayers(search, newMeta) : await fetchPlayers(null, newMeta);
    store.dispatch(setPlayers(response?.data));
    store.dispatch(setMeta(response?.meta));
    store.dispatch(openSuccess('Players fetched successfully'));
    return response;
    } catch (error) {
      store.dispatch(openError('Error fetching players'));
      return error;
    }
  }
);

// Export the players reducer with Redux Persist configuration
export default persistReducer({ key: 'players', storage, keyPrefix: 'nba-ui-' }, playersSlice.reducer);
