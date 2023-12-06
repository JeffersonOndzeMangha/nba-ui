import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MainCard from "../../app/components/MainCard";

interface CardListProps {
    list: any[];
    title: string;
    addToFavorites: (player: any) => void;
    removeFromFavorites: (player: any) => void;
}

const PlayerCardList = (props: CardListProps) => {
    const { list, title, addToFavorites, removeFromFavorites } = props;

    return (
        <MainCard title={title}>
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
                            <TableRow key={player.id}>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell>{player.team}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => addToFavorites(player)}
                                    >
                                        Add to favorites
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => removeFromFavorites(player)}
                                    >
                                        Remove from favorites
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};

export default PlayerCardList;
