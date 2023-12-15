import { StarTwoTone, StarOutline } from "@material-ui/icons";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Player } from "../types/Player";

/**
 * PlayerRow is a sub-component of PlayerCardList that displays a single player's information in a table row.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {Player} props.player - The player object to display.
 * @param {(player: Player) => void} props.manageFavorites - A function to manage player favorites.
 *
 * @returns {JSX.Element} The PlayerRow component.
 *
 * @example
 * // Basic usage:
 * <PlayerRow player={player} manageFavorites={manageFavorites} />
 */
const PlayerRow = (props: {
    player: Player;
    manageFavorites: (player: Player) => void;
}): JSX.Element => {
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
};

export default PlayerRow;