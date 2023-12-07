import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  PlayersStateProps,
  addToFavorites,
  fetch,
  removeFromFavorites
} from '../../store/playersSlice';
import styles from '../../styles/Players.module.css'
import { Search } from '@material-ui/icons';
import PlayerCardList from '../../components/PlayerCardList';
import { values } from 'lodash';
import { Grid, TextField } from '@mui/material';
import ErrorBoundary from '../../components/ErrorBoundary';

export function Players() {
  const { players, favoritePlayers, newMeta, status, error } = useAppSelector((state) => state.players) ?? {} as PlayersStateProps;
  // if (error) throw new Error(error.message);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('') as any;

  useEffect(() => {
    if ((status == 'idle') || (!searchValue)) dispatch(fetch({ search: searchValue }));
  }, [searchValue]);

  useEffect(() => {
    if (newMeta) {
      dispatch(fetch({ newMeta, search: searchValue }));
    }
  }, [newMeta]);

  return (
    <Grid data-testid="players" container spacing={3} justifyContent='center' style={{
      marginTop: 20,
      padding: 10
    }}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          variant={'standard'}
          placeholder="Search for players"
          data-testid="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Grid>
      <div className={styles.row}>
        <button
          disabled={!searchValue}
          className={styles.asyncButton}
          onClick={() => dispatch(fetch(searchValue))}
        >
          <Search fontSize={'medium'} />
        </button>
        <button
          disabled={!searchValue}
          className={styles.asyncButton}
          onClick={() => setSearchValue('')}
        >
          Clear
        </button>
      </div>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12} md={6}>
        <ErrorBoundary>
          <PlayerCardList
            list={values(players)}
            title="Players"
            pagination
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
