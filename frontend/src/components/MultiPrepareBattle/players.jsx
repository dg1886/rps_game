import { Grid, Typography } from "@mui/material";
import { useContext } from "react";

import { GameContext } from "../../services/gameContext";
import PlayersIcon from "../PlayerIcon";

const Players = () => {
  const { players, gameStatus, thisUser } = useContext(GameContext);

  return players.map((user, index, array) => {
    const angle = (360 / array.length) * index;
    const x = (Math.sin(angle / (180 / Math.PI)) * 240) * -1;
    const y = (Math.cos(angle / (180 / Math.PI)) * 240) * -1;
    const marginTop = 10;

    return (
      <Grid
        item
        xs={4}
        sx={{
          transform: `translate(${x}%, ${y + marginTop}%)`, position: "absolute",
        }}
        key={user.userId}
      >
        <Typography
          sx={{
            position: "absolute", top: "-30px", transform: "translateX(-50%)", left: "50%",
          }}
          variant="playerTittle"
        >{user.playerName}
        </Typography>

        <PlayersIcon
          isPlayer
          status={user.status}
          choice={((gameStatus === "battle") && user.choice) || ((thisUser.userId === user.userId) && user.choice)}
        />
      </Grid>
    );
  });
};

export default Players;