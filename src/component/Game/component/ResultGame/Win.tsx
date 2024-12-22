import React, { useState, useEffect } from "react";
import "./Win.css";
import { IGameStats } from "../GamerTimer/GameTimer";
import { saveToLeaderboard } from "../../../StartScreen/component/Leaderbord/Leaderbord";

interface IWinProps {
    onRestart: Function;
    gameStats: IGameStats;
}

const Win: React.FC<IWinProps> = ({ gameStats, onRestart }) => {
    const [name, setName] = useState(""); // Состояние для имени игрока
    const [isNameEntered, setIsNameEntered] = useState(false); // Проверка, введено ли имя
    useEffect(() => {
        if (isNameEntered) {
            saveToLeaderboard(gameStats.time, gameStats.moves, name);
        }
    }, [isNameEntered, gameStats, name]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleNameSubmit = () => {
        if (name.trim() === "") {
            alert("Пожалуйста, введите ваше имя!");
        } else {
            setIsNameEntered(true);
        }
    };

    return (
        <div className="win-container">
            Выигрыш!
            {!isNameEntered ? (
                <div className="">
                    <input type="text" value={name} onChange={handleNameChange} placeholder="Введите ваше имя" />
                    <button className="" onClick={handleNameSubmit}>
                        Сохранить и продолжить
                    </button>
                </div>
            ) : (
                <div className="win-buttons"></div>
            )}
        </div>
    );
};

export default Win;
