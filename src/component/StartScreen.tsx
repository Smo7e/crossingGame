import React from "react";
import "./StartScreen.css"; // Импортируем CSS файл для стилей

interface IStartScreenProps {
    onStartGame: Function;
}
const StartScreen: React.FC<IStartScreenProps> = ({ onStartGame }) => {
    return (
        <div className="start-screen-container">
            <h1 className="start-title">Правила игры</h1>
            <p className="rules">
                Три девочки, каждая со своим отцом поехали на пикник. Они
                подошли к небольшой речке. У берега есть лодка. Требуется
                перевезти всех людей на другой берег.
            </p>
            <ul>
                <li>
                    Лодка может перевозить не более двух человек за один раз.
                </li>
                <li>Пустая лодка не плавает.</li>
                <li>
                    Девочки боятся оставаться с чужим отцом если рядом нет
                    своего.
                </li>
            </ul>
            <button className="start-button" onClick={() => onStartGame()}>
                Играть
            </button>
            <h2 className="leaderboard-title">Таблица лидеров</h2>
            <table className="leaderboard">
                <thead>
                    <tr>
                        <th>Игрок</th>
                        <th>Очки</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Игрок 1</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Игрок 2</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>Игрок 3</td>
                        <td>60</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default StartScreen;
