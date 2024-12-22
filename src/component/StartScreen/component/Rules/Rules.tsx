import React from "react";
import CrossingText from "../CrossingText/CrossingText";
import "./Rules.css";

const Rules: React.FC<{ onClose: Function }> = ({ onClose }) => {
    return (
        <>
            <div className="rules-container">
                <div style={{ color: "black", width: "100%", textAlign: "center", fontSize: "3vw" }}>Правила игры</div>

                <div>
                    Задача о миссионерах и людоедах. Три миссионера и три людоеда должны пересечь реку на лодке,
                    способной выдержать не более двух человек. При этом на одном берегу не может оставаться больше
                    людоедов, чем миссионеров (иначе миссионеров съедят). Лодка также не может пересечь реку без людей
                    на борту.
                </div>
            </div>
            <button className="leaderbord-button-back" onClick={() => onClose(false)}></button>
            <CrossingText position={{ top: 0, left: 20 }} />
        </>
    );
};

export default Rules;
