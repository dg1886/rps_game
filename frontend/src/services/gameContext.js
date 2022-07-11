import {
  createContext, useMemo, useState,
} from "react";
import { io } from "socket.io-client";

export const GameContext = createContext(null);

const socket = io("/");

const GameContextProvider = ({ children }) => {
  const [isBattle, toggleBattle] = useState(false);

  const contextValue = useMemo(() => ({
    isBattle,
    toggleBattle,
    socket,
  }), [isBattle, toggleBattle]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
