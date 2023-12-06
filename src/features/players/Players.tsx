import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  favoritePlayersSelector,
  searchPlayers,
} from './playersSlice';
import styles from './Players.module.css';
import { Divider, Grid, Input } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import PlayerCardList from './PlayerCardList';

export function Players() {
  const favoritePlayers = useAppSelector(favoritePlayersSelector);
  const players = useAppSelector((state) => state.players.view == 'all' ? state.players.players : state.players.filteredPlayers);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState(null) as any;

  return (
    <Grid container justifyContent='center' style={{
      marginTop: 20
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
          list={players}
          title="Players"
          addToFavorites={(player) => console.log('add', player)}
          removeFromFavorites={(player) => console.log('remove', player)}
        />
      </Grid>
    </Grid>
  );
}
