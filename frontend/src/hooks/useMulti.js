import { useContext, useEffect, useState } from "react";

import { GameContext } from "../services/gameContext";

export const useMulti = () => {
  const { isBattle, toggleBattle, socket } = useContext(GameContext);

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

  return {
    isBattle, toggleBattle, rooms,
  };
};
