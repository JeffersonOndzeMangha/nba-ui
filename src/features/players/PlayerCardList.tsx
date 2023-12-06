import { Autocomplete, Button, Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import MainCard from "../../app/components/MainCard";
import { Player } from "../../app/types/Player";
import { useAppSelector } from "../../app/hooks";
import { StarOutline, StarTwoTone } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { groupBy, keys } from "lodash";

interface CardListProps {
    list: Player[];
    title: string;
    addToFavorites?: (player: any) => void;
    removeFromFavorites: (player: any) => void;
}

const PlayerCardList = (props: CardListProps) => {
    const { list, title, addToFavorites, removeFromFavorites } = props;
    const { favoritePlayers } = useAppSelector((state) => state.players);
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

    useEffect(() => {
        console.log('filters', filters);
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
                                <TableCell>Name</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Team</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    <Autocomplete
                                        fullWidth
                                        options={positionsFilters}
                                        value={filters.position ?? []}
                                        multiple
                                        onChange={(e, value) => setFilters({ ...filters, position: value })}
                                        renderInput={(params) => <TextField variant={'standard'} {...params} placeholder="Filter by position" />}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Autocomplete
                                        fullWidth
                                        multiple
                                        options={teamsFilters}
                                        value={filters.team ?? []}
                                        onChange={(e, value) => setFilters({ ...filters, team: value })}
                                        renderInput={(params) => <TextField variant={'standard'} {...params} placeholder="Filter by team" />}
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
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </MainCard>
    );
};

export default PlayerCardList;
