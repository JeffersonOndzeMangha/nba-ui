import { Autocomplete, IconButton, InputLabel, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import MainCard from "../../app/components/MainCard";
import { Player } from "../../app/types/Player";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { StarOutline, StarTwoTone } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { groupBy, keys } from "lodash";
import { setNewMeta } from "./playersSlice";

interface CardListProps {
    list: Player[];
    title: string;
    pagination?: boolean;
    addToFavorites?: (player: any) => void;
    removeFromFavorites: (player: any) => void;
}

const PlayerCardList = (props: CardListProps) => {
    const { list, title, pagination, addToFavorites, removeFromFavorites } = props;
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
                list.length == 0 &&
                <Typography>No players in this list.</Typography>
            }
            {
                list.length > 0 &&
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
                                <TableRow key={player.id} sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}>
                                    <TableCell><Typography>{player.first_name} {player.last_name}</Typography></TableCell>
                                    <TableCell><Typography>{player.position}</Typography></TableCell>
                                    <TableCell><Typography>{player.team.full_name}</Typography></TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => manageFavorites(player)}
                                            color={favoritePlayers[player.id] ? 'warning' : 'primary'}
                                        >
                                            {
                                                favoritePlayers[player.id] ?
                                                    <StarTwoTone /> :
                                                    <StarOutline />
                                            }
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
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
