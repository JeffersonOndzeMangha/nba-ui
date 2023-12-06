import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import MainCard from "../../app/components/MainCard";
import { Player } from "../../app/types/Player";
import { useAppSelector } from "../../app/hooks";
import { StarOutline, StarTwoTone } from "@material-ui/icons";

interface CardListProps {
    list: Player[];
    title: string;
    addToFavorites?: (player: any) => void;
    removeFromFavorites: (player: any) => void;
}

const PlayerCardList = (props: CardListProps) => {
    const { list, title, addToFavorites, removeFromFavorites } = props;
    const { favoritePlayers } = useAppSelector((state) => state.players);

    const manageFavorites = (player: any) => {
        if (favoritePlayers[player.id]) {
            removeFromFavorites(player);
        } else {
            if (addToFavorites) addToFavorites(player);
        }
    }

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
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Team</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((player: any) => (
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
