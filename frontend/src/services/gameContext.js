import {
  createContext, useEffect, useMemo, useState,
} from "react";
import { io } from "socket.io-client";

export const GameContext = createContext(null);

const socket = io("/");

const GameContextProvider = ({ children }) => {
  const [isBattle, toggleBattle] = useState(false);

  const [result, setResultBattle] = useState({
    conclusion: "",
    user: "",
    computer: "",
  });

  const [messageOptions, setMessageOptions] = useState([]);

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (result.conclusion === result.user) {
      setMessageOptions(["You", "Win"]);
      setScore((s) => s + 1);
    }
    if (result.conclusion === result.computer) {
      setMessageOptions(["You", "Lose"]);
      setScore((s) => s - 1);
    }
    if (result.conclusion === null) {
      setMessageOptions(["Draw", ""]);
      setScore((s) => s + 0);
    }
  }, [result]);

  const emitUserChoice = ({ playerChoice }) => {
    socket.emit("single-battle", { playerChoices: playerChoice, roomId: "free1" });
    toggleBattle(true);
  };

  useEffect(() => {
    socket.on("single-battle-result", (res) => {
      setResultBattle({
        conclusion: res.conclusion,
        computer: res.computer,
        user: res.user,
      });
    });
    return () => socket.off("single-battle-result");
  }, []);

  const contextValue = useMemo(() => ({
    isBattle,
    toggleBattle,
    socket,
    emitUserChoice,
    result,
    messageOptions,
    score,
  }), [isBattle, toggleBattle, result, messageOptions, score]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
