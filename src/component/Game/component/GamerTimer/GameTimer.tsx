import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

export interface IGameStats {
    moves: number;
    time: number;
}

const GameTimer = forwardRef((_, ref) => {
    const [moves, setMoves] = useState<number>(0);
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    const updateTime = () => {
        const currentTime = new Date();

        setElapsedTime(currentTime.getTime() - startTime.getTime());
    };

    useEffect(() => {
        const interval = setInterval(updateTime, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [startTime]);

    const formatTime = (timeInMs: number) => {
        const totalSeconds = Math.floor(timeInMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const incrementMoves = () => {
        setMoves((prevMoves) => prevMoves + 1);
    };

    const getGameStats = (): IGameStats => {
        return {
            moves,
            time: elapsedTime / 1000,
        };
    };
    const resetData = () => {
        setElapsedTime(0);
        setMoves(0);
        setStartTime(new Date());
    };

    useImperativeHandle(ref, () => ({
        incrementMoves,
        getGameStats,
        resetData,
    }));

    return (
        <div style={{ position: "absolute" }} className="noselect">
            <p>Moves: {moves}</p>
            <p>Time: {formatTime(elapsedTime)}</p>
        </div>
    );
});

export default GameTimer;
