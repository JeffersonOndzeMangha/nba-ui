import { Autocomplete, IconButton, InputLabel, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import MainCard from "./MainCard";
import { Player } from "../types/Player";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { StarOutline, StarTwoTone } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { groupBy, keys } from "lodash";
import { setNewMeta } from "../store/playersSlice";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

interface CardListProps {
    list: Player[];
    title: string;
    pagination?: boolean;
    status?: string;
    addToFavorites?: (player: any) => void;
    removeFromFavorites: (player: any) => void;
}

const PlayerCardList = (props: CardListProps) => {
    const { list, title, pagination, status, addToFavorites, removeFromFavorites } = props;
    const { favoritePlayers, currentMeta } = useAppSelector((state) => state.players);
    const dispatch = useAppDispatch();
    const [filters, setFilters] = useState({
        position: [] as any,
        team: [] as any
    }) as any;
    const [viewList, setViewList] = useState(list) as any;
    const teamsFilters = keys(groupBy(list, (player) => player.team.full_name));
    const positionsFilters = keys(groupBy(list, (player) => player.position));

    const manageFavorites = (player: any) => {
        if (favoritePlayers[player.id]) {
            removeFromFavorites(player);
        } else {
            if (addToFavorites) addToFavorites(player);
        }
    }

    const handlePageChange = (event: any, newPage: any) => {
        dispatch(setNewMeta({ ...currentMeta, page: newPage+1 }));
    }

    const handleRowsPerPageChange = (event: any) => {
        dispatch(setNewMeta({ ...currentMeta, per_page: parseInt(event.target.value) }));
    }

    useEffect(() => {
        if (!!filters.position.length || !!filters.team.length) {
            // using an OR operator here because we want to show players that match any of the filters
            const filteredList = list.filter((player) => {
                const positionMatch = !!filters.position.length && filters.position.length > 0 && filters.position.includes(player.position);
                const teamMatch = !!filters.team.length && filters.team.length > 0 && filters.team.includes(player.team.full_name);
                return positionMatch || teamMatch;
            });
            setViewList(filteredList);
        } else {
            setViewList(list);
        }
    }, [filters.position, filters.team, list]);

    return (
        <MainCard title={title}>
            {
                 status == 'loading' && <CircularProgressWithLabel label="Loading players..." />
            }
            {
                list.length == 0 && status != 'loading' &&
                <Typography>No players in this list.</Typography>
            }
            {
                list.length > 0 && status != 'loading' &&
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                '&::first-of-type td, &::first-of-type th': { border: 0 }
                            }}>
                                {
                                    pagination &&
                                    <TablePagination
                                        count={currentMeta.total_count}
                                        page={currentMeta.current_page-1}
                                        onPageChange={handlePageChange}
                                        variant="head"
                                        color="secondary"
                                        rowsPerPage={currentMeta.per_page}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                    />
                                }
                            </TableRow>
                            <TableRow sx={{
                                '&::first-of-type td, &::first-of-type th': { border: 0 }
                            }}>
                                <TableCell>Name</TableCell>
                                <TableCell>
                                    <InputLabel>Position</InputLabel>
                                    <Autocomplete
                                        fullWidth
                                        options={positionsFilters}
                                        value={filters.position ?? []}
                                        multiple
                                        onChange={(e, value) => setFilters({ ...filters, position: value })}
                                        renderInput={(params) => <TextField variant={'standard'} {...params} placeholder="Filter" />}
                                    />
                                </TableCell>
                                <TableCell>
                                    <InputLabel>Team</InputLabel>
                                    <Autocomplete
                                        fullWidth
                                        multiple
                                        options={teamsFilters}
                                        value={filters.team ?? []}
                                        onChange={(e, value) => setFilters({ ...filters, team: value })}
                                        renderInput={(params) => <TextField variant={'standard'} {...params} placeholder="Filter" />}
                                    />
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {viewList.map((player: any) => (
                                <PlayerRow
                                    key={player.id}
                                    player={player}
                                    manageFavorites={manageFavorites}
                                />
                            ))}
                            <TableRow>
                            {
                                pagination &&
                                <TablePagination
                                    sx={{
                                        borderBottom: 0
                                    }}
                                    count={currentMeta.total_count}
                                    page={currentMeta.current_page-1}
                                    onPageChange={handlePageChange}
                                    variant="footer"
                                    color="secondary"
                                    rowsPerPage={currentMeta.per_page}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                />
                            }
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </MainCard>
    );
};

const PlayerRow = (props: {
    player: Player;
    manageFavorites: (player: Player) => void;
}) => {
    const { player, manageFavorites } = props;
    const { favoritePlayers } = useAppSelector((state) => state.players);
    const [color, setColor] = useState('');
    const isFavorite = favoritePlayers[player.id] ? true : false;

    const changeColor = (player: Player) => {
        if (isFavorite) {
            // set color to a random color
            const randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            setColor(randomColor);
        }
    }

    return (
        <TableRow key={player.id} sx={{
            '&:hover': {
                cursor: isFavorite ? 'pointer' : 'default',
            },
            backgroundColor: color
        }}
        onClick={() => changeColor(player)}
        
        >
            <TableCell>{player.first_name} {player.last_name}</TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.team.full_name}</TableCell>
            <TableCell>
                <IconButton 
                    onClick={() => manageFavorites(player)}
                    color={isFavorite ? 'warning' : 'primary'}
                >
                    {
                        isFavorite ? <StarTwoTone /> : <StarOutline />
                    }
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default PlayerCardList;
