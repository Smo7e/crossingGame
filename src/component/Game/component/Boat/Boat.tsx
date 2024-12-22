import { useEffect, useState, useRef } from "react";
import { IIsGoBoat } from "../../index";
import "./Boat.css";

interface IBoatProps {
    isGoBoat: IIsGoBoat;
}

const Boat: React.FC<IBoatProps> = ({ isGoBoat }) => {
    const boatPositionRef = useRef<number>(isGoBoat.needPosition); // Сохраняем начальную позицию лодки
    const [boatPosition, setBoatPosition] = useState<number>(isGoBoat.needPosition); // Текущее состояние для рендера
    const animationFrameId = useRef<number | null>(null); // Для хранения ID запроса на анимацию
    const lastUpdateTime = useRef<number>(0); // Хранение времени последнего обновления

    const speed = 1000; // Скорость лодки (пиксели за кадр)

    const updateBoatPosition = (timestamp: number) => {
        if (!lastUpdateTime.current) lastUpdateTime.current = timestamp;
        const deltaTime = timestamp - lastUpdateTime.current;
        const step = (speed * deltaTime) / 1000;
        if (boatPositionRef.current !== isGoBoat.needPosition) {
            if (Math.abs(isGoBoat.needPosition - boatPositionRef.current) <= step) {
                boatPositionRef.current = isGoBoat.needPosition;
            } else if (boatPositionRef.current < isGoBoat.needPosition) {
                boatPositionRef.current += step;
            } else {
                boatPositionRef.current -= step;
            }
            setBoatPosition(boatPositionRef.current);
        }

        lastUpdateTime.current = timestamp;
        if (isGoBoat.isGo && boatPositionRef.current !== isGoBoat.needPosition) {
            animationFrameId.current = requestAnimationFrame(updateBoatPosition);
        }
    };

    useEffect(() => {
        if (isGoBoat.isGo) {
            animationFrameId.current = requestAnimationFrame(updateBoatPosition);
        } else {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isGoBoat.needPosition]);

    return (
        <img
            src={require("./boat.png")}
            className="boat-image noselect"
            style={{
                position: "absolute",
                left: `${boatPosition}px`,
                top: "65vh",
                zIndex: 200,
                pointerEvents: "none",
            }}
        />
    );
};

export default Boat;
