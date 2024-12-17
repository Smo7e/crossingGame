import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

interface GameStats {
    moves: number;
    time: string;
}

const GameTimer = forwardRef((_, ref) => {
    // Хранение количества ходов
    const [moves, setMoves] = useState<number>(0);

    // Хранение времени игры
    const [startTime] = useState<Date>(new Date());
    const [elapsedTime, setElapsedTime] = useState<number>(0); // Время в миллисекундах

    // Функция для обновления времени
    const updateTime = () => {
        const currentTime = new Date();
        setElapsedTime(currentTime.getTime() - startTime.getTime());
    };

    // Запуск таймера при монтировании компонента
    useEffect(() => {
        const interval = setInterval(updateTime, 1000);

        // Очистка таймера при размонтировании компонента
        return () => {
            clearInterval(interval);
        };
    }, [startTime]);

    // Форматирование времени в формат "часы:минуты:секунды"
    const formatTime = (timeInMs: number) => {
        const totalSeconds = Math.floor(timeInMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    // Метод для увеличения количества ходов
    const incrementMoves = () => {
        setMoves((prevMoves) => prevMoves + 1);
    };

    // Метод для получения статистики (время и количество ходов)
    const getGameStats = (): GameStats => {
        return {
            moves,
            time: formatTime(elapsedTime),
        };
    };

    // Используем useImperativeHandle, чтобы передать методы родительскому компоненту
    useImperativeHandle(ref, () => ({
        incrementMoves,
        getGameStats,
    }));

    return (
        <div style={{ position: "absolute" }}>
            <p>Moves: {moves}</p>
            <p>Time: {formatTime(elapsedTime)}</p>
        </div>
    );
});

export default GameTimer;
