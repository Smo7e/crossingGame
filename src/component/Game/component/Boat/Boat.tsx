import { useEffect, useState, useRef } from "react";
import { IIsGoBoat } from "../../index";
import "./Boat.css";

interface IBoatProps {
    go: Function;
    isGoBoat: IIsGoBoat;
    forceTp: boolean;
}

const Boat: React.FC<IBoatProps> = ({ go, isGoBoat, forceTp }) => {
    const boatPositionRef = useRef<number>(isGoBoat.needPosition);
    const [boatPosition, setBoatPosition] = useState<number>(isGoBoat.needPosition);
    const animationFrameId = useRef<number | null>(null);
    const lastUpdateTime = useRef<number>(0);

    const speed = 1000;

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
        if (forceTp) {
            setBoatPosition(isGoBoat.needPosition);

            boatPositionRef.current = isGoBoat.needPosition;
            return;
        }
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
    }, [isGoBoat.needPosition, forceTp]);

    return (
        <img
            onClick={() => go()}
            src={require("./boat.png")}
            className="boat-image"
            style={{
                position: "absolute",
                left: `${boatPosition}px`,
                top: "75vh",
                zIndex: 200,
            }}
        />
    );
};

export default Boat;
