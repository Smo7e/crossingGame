import React, { useState } from "react";
import "./StartScreen.css"; // Импортируем CSS файл для стилей
import Leaderboard from "./component/Leaderbord/Leaderbord";
import Rules from "./component/Rules/Rules";
import CrossingText from "./component/CrossingText/CrossingText";

interface IStartScreenProps {
    onStartGame: Function;
}
const StartScreen: React.FC<IStartScreenProps> = ({ onStartGame }) => {
    const [isLeaderbord, setIsLeaderbord] = useState(false);
    const [isRules, setIsRules] = useState(false);

    return (
        <div className="start-screen-container">
            {isLeaderbord ? (
                <Leaderboard onClose={setIsLeaderbord} />
            ) : isRules ? (
                <Rules onClose={setIsRules} />
            ) : (
                <>
                    <div>
                        <button className="start-button" onClick={() => onStartGame()}>
                            Начать игру
                        </button>
                        <button className="leaderbord-button" onClick={() => setIsLeaderbord(true)}>
                            Таблица Лидеров
                        </button>
                        <button className="rules-button" onClick={() => setIsRules(true)}>
                            Правила игры
                        </button>
                        <CrossingText position={{ top: 0, left: 35 }} />
                    </div>
                </>
            )}
        </div>
    );
};

export default StartScreen;
