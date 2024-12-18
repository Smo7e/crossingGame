import React, { useState } from "react";
import StartScreen from "./component/StartScreen/StartScreen";
import Game from "./component/Game/Game"; // Ваш компонент игры
import RiverScene from "./component/Game/component/RiverScene/RiverScene";
import MusicPlayer from "./component/MusicPlayer/MusicPlayer";
const App = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    return (
        <div>
            {!isGameStarted ? (
                <StartScreen onStartGame={handleStartGame} />
            ) : (
                <div className="App">
                    <Game onStartGame={setIsGameStarted} />
                    <RiverScene />
                    <MusicPlayer />
                </div>
            )}
        </div>
    );
};

export default App;
