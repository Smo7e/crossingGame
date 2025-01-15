import React from "react";
import "./Lose.css";
interface ILoseProps {
    onRestart: Function;
}
const Lose: React.FC<ILoseProps> = ({ onRestart }) => {
    return <div className="lose-container">Плот перевесил допустимый вес. Попробуйте начать сначала.</div>;
};

export default Lose;
