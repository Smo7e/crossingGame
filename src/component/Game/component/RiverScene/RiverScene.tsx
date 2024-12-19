import React, { useEffect } from "react";
import "./RiverScene.css";
const RiverScene: React.FC = () => {
    function getRandomNumber(a: number, b: number) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
    const threesCount = 50;
    const trees = [];
    for (let i = 0; i < threesCount; i++) {
        const top = getRandomNumber(48, 60);
        const left = getRandomNumber(-10, 20);
        trees.push({ top, left });
    }
    for (let i = 0; i < threesCount; i++) {
        const top = getRandomNumber(80, 98);
        const left = getRandomNumber(-10, 20);
        trees.push({ top, left });
    }
    for (let i = 0; i < threesCount; i++) {
        const top = getRandomNumber(48, 65);
        const left = getRandomNumber(65, 98);
        trees.push({ top, left });
    }
    for (let i = 0; i < threesCount; i++) {
        const top = getRandomNumber(80, 100);
        const left = getRandomNumber(65, 98);
        trees.push({ top, left });
    }

    return (
        <div className="scene">
            {/* Небо */}
            <div className="sky">
                {/* Солнце */}
                <div className="sun"></div>
            </div>

            {/* Река */}
            <div className="river">
                {/* Левый берег */}
                <div className="left-bank">
                    <div className="tree tree-left"></div>
                </div>

                {/* Центральная река */}
                <div className="water"></div>

                {/* Правый берег */}
                <div className="right-bank">
                    <div className="tree tree-right"></div>
                </div>
            </div>
            <div className="clouds">
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="cloud cloud-3"></div>
                <div className="cloud cloud-4"></div>
            </div>
            <div className="landscape">
                {trees.map((tree, index) => (
                    <div
                        key={index}
                        className="tree"
                        style={{
                            top: `${tree.top}%`,
                            left: `${tree.left}%`,
                            zIndex: tree.top,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default RiverScene;
