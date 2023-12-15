import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  PlayersStateProps,
  addToFavorites,
  fetch,
  removeFromFavorites
} from '../../store/reducers/playersSlice';
import PlayerCardList from '../../components/PlayerCardList';
import { values } from 'lodash';
import { Grid, TextField } from '@mui/material';
import ErrorBoundary from '../../components/ErrorBoundary';

/**
 * Players is a React component that displays a list of players and their favorites. It provides a search input to filter players by name.
 *
 * @component
 *
 * @returns {JSX.Element} The Players component.
 *
 * @example
 * // Basic usage:
 * <Players />
 */
export function Players(): JSX.Element {
  const { players, favoritePlayers, newMeta, status } = useAppSelector((state) => state.players) ?? {} as PlayersStateProps;
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('') as any;

  useEffect(() => {
    if ((status === 'idle') || (!searchValue)) dispatch(fetch({ search: searchValue }));
  }, [searchValue, dispatch]);

  useEffect(() => {
    if (newMeta) {
      dispatch(fetch({ newMeta, search: searchValue }));
    }
  }, [newMeta, dispatch]);

  return (
    <Grid data-testid="players" container spacing={3} justifyContent='center' style={{
      marginTop: 20,
      padding: 10
    }}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          variant={'standard'}
          placeholder="Search for players by name"
          data-testid="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12} md={6}>
        <ErrorBoundary>
          <PlayerCardList
            list={values(players)}
            title="Players"
            pagination
            status={status}
            addToFavorites={(player) => dispatch(addToFavorites(player))}
            removeFromFavorites={(player) => dispatch(removeFromFavorites(player))}
          />
        </ErrorBoundary>
      </Grid>
      <Grid item xs={12} md={6}>
        <ErrorBoundary>
          <PlayerCardList
            list={values(favoritePlayers)}
            title="Favorites"
            removeFromFavorites={(player) => dispatch(removeFromFavorites(player))}
          />
        </ErrorBoundary>
      </Grid>
    </Grid>
  );
}
