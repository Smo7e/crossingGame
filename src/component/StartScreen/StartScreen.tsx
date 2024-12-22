import React, { useState } from "react";
import "./StartScreen.css"; // Импортируем CSS файл для стилей
import Leaderboard from "./component/Leaderbord/Leaderbord";
import Rules from "./component/Rules/Rules";

interface IStartScreenProps {
    onStartGame: Function;
}
const StartScreen: React.FC<IStartScreenProps> = ({ onStartGame }) => {
    const [isLeaderbord, setIsLeaderbord] = useState(false);

    return (
        <div className="start-screen-container">
            {isLeaderbord ? (
                <Leaderboard onClose={setIsLeaderbord} />
            ) : (
                <>
                    <div className="start-title">Отец и два сына</div>
                    <div>
                        <button className="start-button" onClick={() => onStartGame()}>
                            Начать игру
                        </button>
                        <button className="leaderbord-button" onClick={() => setIsLeaderbord(true)}>
                            Таблица Лидеров
                        </button>
                        <Rules />
                    </div>
                </>
            )}
        </div>
    );
};

export default StartScreen;
