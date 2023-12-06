import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addToFavorites,
  fetch,
  removeFromFavorites,
  searchPlayers,
} from './playersSlice';
import styles from './Players.module.css';
import { Divider, Grid, Input } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import PlayerCardList from './PlayerCardList';
import { add, size, values } from 'lodash';

export function Players() {
  const { players, favoritePlayers } = useAppSelector((state) => state.players);
  const view = useAppSelector((state) => state.players.view);
  const status = useAppSelector((state) => state.players.status);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState(null) as any;

  useEffect(() => {
    if (view == 'all' && size(players) == 0 && status == 'idle') dispatch(fetch());
  }, [view]);

  return (
    <Grid container spacing={3} justifyContent='center' style={{
      marginTop: 20,
      padding: 10
    }}>
      <Grid item xs={6}>
        <Input
          fullWidth
          placeholder="Search for players"
          inputProps={{ 'aria-label': 'description' }}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Grid>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(searchPlayers(searchValue))}
        >
          <Search fontSize={'medium'} />
        </button>
      </div>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} md={6}>
        <PlayerCardList
          list={values(players)}
          title="Players"
          addToFavorites={(player) => dispatch(addToFavorites(player))}
          removeFromFavorites={(player) => dispatch(removeFromFavorites(player))}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PlayerCardList
          list={values(favoritePlayers)}
          title="Favorites"
          removeFromFavorites={(player) => dispatch(removeFromFavorites(player))}
        />
      </Grid>
    </Grid>
  );
}
