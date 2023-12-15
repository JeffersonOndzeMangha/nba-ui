import { Autocomplete, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import MainCard from "./MainCard";
import { Player } from "../types/Player";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { groupBy, keys } from "lodash";
import { setNewMeta } from "../store/reducers/playersSlice";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import PlayerRow from "./PlayerRow";

interface CardListProps {
    list: Player[];
    title: string;
    pagination?: boolean;
    status?: string;
    addToFavorites?: (player: any) => void;
    removeFromFavorites: (player: any) => void;
}

/**
 * PlayerCardList is a component that displays a list of players in a table format.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {Player[]} props.list - The list of players to display.
 * @param {string} props.title - The title for the player list.
 * @param {boolean} [props.pagination] - Whether to display pagination controls.
 * @param {string} [props.status] - The status of the player list (e.g., 'loading', 'loaded').
 * @param {(player: Player) => void} [props.addToFavorites] - A function to add a player to favorites.
 * @param {(player: Player) => void} props.removeFromFavorites - A function to remove a player from favorites.
 *
 * @returns {ReactNode} The PlayerCardList component.
 *
 * @example
 * // Basic usage:
 * <PlayerCardList list={players} title="Player List" removeFromFavorites={removeFromFavorites} />
 *
 * // With pagination controls:
 * <PlayerCardList list={players} title="Player List" pagination removeFromFavorites={removeFromFavorites} />
 */
const PlayerCardList = (props: CardListProps): JSX.Element => {
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

    const handlePageChange = (_event: any, newPage: any): void => {
        dispatch(setNewMeta({ ...currentMeta, page: newPage+1 }));
    }

    const handleRowsPerPageChange = (event: any): void => {
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

    if (status === 'error') throw new Error('Error loading players.'); // this should trigger the ErrorBoundary component

    return (
        <MainCard title={title}>
            {
                (status === 'loading') && <CircularProgressWithLabel label="Loading players..." /> ||
                (status !== 'loading' && list.length == 0) && <Typography>No players in this list.</Typography> ||
                (status != 'loading' && list.length > 0) &&
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

export default PlayerCardList;
