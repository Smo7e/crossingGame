import React from "react";
import "./Lose.css"; // Импортируем CSS файл для стилей
interface ILoseProps {
    onRestart: Function;
}
const Lose: React.FC<ILoseProps> = ({ onRestart }) => {
    return (
        <div className="lose-container">
            <h1 className="lose-title">Проигрыш!</h1>
            <h1 className="lose-title">Людоедов оказалось больше миссионеров</h1>
        </div>
    );
};

export default Lose;
