import React from "react";

import "./CrossingText.css";

interface CrossingTextProps {
    position: { top: number; left: number };
}

const CrossingText: React.FC<CrossingTextProps> = ({ position }) => {
    return (
        <div
            className="crossing-text"
            style={{
                position: "absolute",
                top: `${position.top}vh`,
                left: `${position.left}vw`,
            }}
        >
            Переправа
        </div>
    );
};

export default CrossingText;
