import React from "react";
import "./Lose.css"; // Импортируем CSS файл для стилей
interface ILoseProps {
    onRestart: Function;
}
const Lose: React.FC<ILoseProps> = ({ onRestart }) => {
    return <div className="lose-container">Лодка перевесила допустимый вес. Попробуйте начать сначала.</div>;
};

export default Lose;
