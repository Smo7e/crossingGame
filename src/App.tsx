import React, { useState } from "react";
import StartScreen from "./component/StartScreen";
import Game from "./component/Game"; // Ваш компонент игры
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
                    <Game />
                </div>
            )}
        </div>
    );
};

export default App;
