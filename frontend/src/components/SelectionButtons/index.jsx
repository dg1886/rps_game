import { Grid } from "@mui/material";
import { useContext } from "react";
import { io } from "socket.io-client";

import { choiceIcons } from "../../constants/choiceIcons";
import { GAME_ITEMS } from "../../constants/names";
import { GameContext } from "../../services/gameContext";
import IconButton from "../Button";
import { AnimatedTittle, IconGridWrap } from "./style";

const iconsInfo = [
  { area: "leftUp", id: GAME_ITEMS.ROCK },
  { area: "rightUp", id: GAME_ITEMS.PAPER },
  { area: "down", id: GAME_ITEMS.SCISSORS },
];

const SelectionButtons = () => {
  const { toggleBattle } = useContext(GameContext);
  const socket = io("/");

  const iconEvent = (e) => {
    socket.emit("single-battle", { playerChoices: e.currentTarget.id, roomId: "free1" });
    toggleBattle(true);
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: "column", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", height: "100%",
      }}
    >
      <AnimatedTittle spacing={45} variant="caption">make your choice</AnimatedTittle>

      <IconGridWrap>
        {iconsInfo.map((item) => (
          <IconButton
            key={item.id}
            id={item.id}
            variant="iconWrap"
            figure={item.id}
            onClick={iconEvent}
            $gridArea={item.area}
            $isShake
          >
            {choiceIcons[item.id]}
          </IconButton>
        ))}
      </IconGridWrap>

    </Grid>
  );
};

export default SelectionButtons;
