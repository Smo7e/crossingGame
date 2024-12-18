import React, { useState } from "react";
import "./StartScreen.css"; // Импортируем CSS файл для стилей
import Leaderboard from "./component/Leaderbord/Leaderbord";

interface IStartScreenProps {
    onStartGame: Function;
}
const StartScreen: React.FC<IStartScreenProps> = ({ onStartGame }) => {
    const [isLeaderbord, setIsLeaderbord] = useState(false);

    return (
        <div className="start-screen-container">
            {!isLeaderbord ? (
                <>
                    <div>
                        <h1 className="start-title">Правила игры</h1>
                        <p className="rules">
                            Три девочки, каждая со своим отцом поехали на пикник. Они подошли к небольшой речке. У
                            берега есть лодка. Требуется перевезти всех людей на другой берег.
                        </p>
                        <ul>
                            <li>Лодка может перевозить не более двух человек за один раз.</li>
                            <li>Пустая лодка не плавает.</li>
                            <li>Девочки боятся оставаться с чужим отцом если рядом нет своего.</li>
                        </ul>
                        <button className="start-button" onClick={() => onStartGame()}>
                            Играть
                        </button>
                        <button className="leaderbord-button" onClick={() => setIsLeaderbord(true)}>
                            Таблица Лидеров
                        </button>
                    </div>
                </>
            ) : (
                <></>
            )}

            {isLeaderbord ? <Leaderboard onClose={setIsLeaderbord} /> : <></>}
        </div>
    );
};

export default StartScreen;
