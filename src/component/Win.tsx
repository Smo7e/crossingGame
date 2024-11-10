import React from "react";
import "./Win.css";
interface IWinProps {
    onRestart: Function;
}
const Win: React.FC<IWinProps> = ({ onRestart }) => {
    return (
        <div className="win-container">
            <h1 className="win-title">Победа!</h1>
            <div className="win-buttons">
                <button className="win-button" onClick={() => onRestart}>
                    Рестарт
                </button>
            </div>
        </div>
    );
};

export default Win;
