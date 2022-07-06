import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
  const [choice, setChoice] = useState(false);
  const { toggleBattle } = useContext(GameContext);
  const socket = io("/");

  useEffect(() => {
    return () => socket.emit("single-battle", { playerChoice: choice, roomId: "free1" });
  }, [choice]);

  const iconEvent = (e) => {
    setChoice(e.currentTarget.id);
    toggleBattle(true);
  };

  return (
    <Grid
      container
      xs={12}
      sx={{
        flexDirection: "column", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", height: "100%",
      }}
    >
      <AnimatedTittle spacing={45} variant="caption">make your choice</AnimatedTittle>

      <IconGridWrap>
        {iconsInfo.map((item) => (
          <IconButton id={item.id} variant="iconWrap" figure={item.id} onClick={iconEvent} gridArea={item.area} isShake>
            {choiceIcons[item.id]}
          </IconButton>
        ))}
      </IconGridWrap>

    </Grid>
  );
};

export default SelectionButtons;
