import React from "react";
import "./Lose.css"; // Импортируем CSS файл для стилей
interface ILoseProps {
    onRestart: Function;
}
const Lose: React.FC<ILoseProps> = ({ onRestart }) => {
    return (
        <div className="lose-container">
            <h1 className="lose-title">Проигрыш!</h1>
            <div className="lose-buttons">
                <button className="lose-button" onClick={() => onRestart()}>
                    Рестарт
                </button>
            </div>
        </div>
    );
};

export default Lose;
