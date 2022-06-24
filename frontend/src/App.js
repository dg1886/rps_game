import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { io } from "socket.io-client";

import RoutesManager from "./routes/RoutesManager";
import GameContextProvider from "./services/gameContext";
import theme from "./theme";

function App() {
  const [rooms, setRooms] = useState([]);

  // TODO: paste this rooms when player choose the rooms

  useEffect(() => {
    const socket = io("/");
    socket.on("connect", () => {
      socket.on("available-rooms", (aRooms) => {
        // delete aRooms[socket.id];
        console.log(aRooms);
        console.log(rooms);
        setRooms(aRooms);
      });
    });

    return () => socket.close();
  }, []);
  // const renderRooms = Object.keys(rooms).map((it) => {
  //   return (
  //     <div>
  //       <h4>Название комнаты {it}</h4>
  //       <h4>Количество людей {rooms[it]}</h4>
  //     </div>
  //   );
  // });
  return (
    <>
      {/* {rooms && [renderRooms] } */}
      <ThemeProvider theme={theme}>
        <GameContextProvider>
          <BrowserRouter>
            <RoutesManager />
          </BrowserRouter>
        </GameContextProvider>
      </ThemeProvider>

    </>
  );
}

export default App;
