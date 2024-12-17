import { useEffect, useState } from "react";
import { IIsGoBoat } from "./Game";

interface IBoatProps {
    isGoBoat: IIsGoBoat;
}

const Boat: React.FC<IBoatProps> = ({ isGoBoat }) => {
    const [boatPosition, setBoatPosition] = useState<number>(isGoBoat.needPosition);

    useEffect(() => {
        // Обновляем состояние лодки только если isGoBoat.isGo изменяется на true
        const intervalId = setInterval(() => {
            setBoatPosition(isGoBoat.needPosition);
        }, 15);

        return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
    }, [boatPosition, isGoBoat.isGo, isGoBoat.needPosition]);

    return (
        <div className="boat">
            <img
                src={require("./boat.png")}
                className="boat-image"
                style={{
                    position: "relative",
                    left: `${boatPosition}px`,
                    top: "73vh",
                }}
            />
        </div>
    );
};

export default Boat;
