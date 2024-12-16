import React, { useState } from "react";
import StartScreen from "./component/StartScreen";
import Game from "./component/Game"; // Ваш компонент игры
import Test from "./component/Test";
import RiverScene from "./component/RiverScene";
const App = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    return (
        <div>
            {/* <Test /> */}

            {!isGameStarted ? (
                <StartScreen onStartGame={handleStartGame} />
            ) : (
                <div className="App">
                    <Game />
                    <RiverScene />
                </div>
            )}
        </div>
    );
};

export default App;
