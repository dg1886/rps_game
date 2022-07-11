import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { useSingle } from "../../hooks/useSingleBattle";
import { GameResultGrid, StyledTypography } from "../../pages/single_player/Battle/styles";
import ChoiceButton from "../ChoiceButton";
import GameItemContainer from "../GameItemContainer";
import ResultMessage from "../ResultMessage";

const SingleBattle = () => {
  const [counter, setCounter] = useState(3);
  const { result } = useSingle();

  useEffect(() => {
    const timer = counter > 0 ? setTimeout(() => {
      setCounter(counter - 1);
    }, 1000) : 0;
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  return (
    <Grid container xs={12} sx={{ margin: "auto", paddingTop: "7%", position: "relative" }}>
      <Grid item xs={4} sx={{ margin: "auto", flexDirection: "column" }}>
        <Box sx={{ height: "105px" }}>
          <StyledTypography variant="h2" color="textPrimary" sx={{ textTransform: "uppercase" }}>You Picked</StyledTypography>
        </Box>

        <Box sx={{ height: "fit-content", marginTop: "10px" }}>
          <ChoiceButton choice={result.user} isPlayer />
        </Box>

      </Grid>

      <GameResultGrid item xs={8} sm={3} md={2}>
        {counter === 0
      && (
        <ResultMessage />
      )}
      </GameResultGrid>

      <Grid item xs={4} sx={{ margin: "auto", flexDirection: "column" }}>
        <Box sx={{ height: "105px" }}>
          <StyledTypography variant="h2" color="textPrimary" sx={{ textTransform: "uppercase" }}>The House Picked</StyledTypography>
        </Box>
        <Box sx={{ height: "fit-content", marginTop: "10px" }}>
          {counter === 0
            ? <ChoiceButton choice={result.computer} timeout={counter} isPlayer={false} />
            : <GameItemContainer timer={counter} />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SingleBattle;
