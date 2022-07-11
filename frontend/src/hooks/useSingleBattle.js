import { useContext, useEffect, useState } from "react";

import { GameContext } from "../services/gameContext";

export const useSingle = () => {
  const { isBattle, toggleBattle, socket } = useContext(GameContext);

  const [result, setResultBattle] = useState({
    conclusion: "",
    user: "",
    computer: "",
  });

  const [messageOptions, setMessageOptions] = useState([]);

  const [score, setScore] = useState(0);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("available-rooms", (aRooms) => {
        // eslint-disable-next-line no-param-reassign
        delete aRooms[socket.id];
        setRooms(aRooms);
      });
    });
  }, [socket]);

  // TODO: fix that, return only you lose
  useEffect(() => {
    if (result.conclusion === result.user) {
      setMessageOptions(["You", "Win"]);
    }
    if (result.conclusion === result.computer) {
      setMessageOptions(["You", "Lose"]);
    }
    if (result.conclusion === null) {
      setMessageOptions(["Draw", ""]);
    }
  }, [result]);

  // TODO: fix score on header
  useEffect(() => {
    setScore(score + 0);
  }, [result]);

  const emitUserChoice = ({ playerChoice }) => {
    socket.emit("single-battle", { playerChoices: playerChoice, roomId: "free1" });
    toggleBattle(true);
  };

  socket.on("single-battle-result", (res) => {
    setResultBattle({
      conclusion: res.conclusion,
      computer: res.computer,
      user: res.user,
    });
  });

  return {
    isBattle, toggleBattle, emitUserChoice, result, messageOptions, score, rooms,
  };
};
