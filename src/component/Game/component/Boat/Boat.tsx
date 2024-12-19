import { useEffect, useState } from "react";
import { IIsGoBoat } from "../../index";
import "./Boat.css";

interface IBoatProps {
    isGoBoat: IIsGoBoat;
}

const Boat: React.FC<IBoatProps> = ({ isGoBoat }) => {
    const [boatPosition, setBoatPosition] = useState<number>(isGoBoat.needPosition);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setBoatPosition(isGoBoat.needPosition);
        }, 15);

        return () => clearInterval(intervalId);
    }, [boatPosition, isGoBoat.isGo, isGoBoat.needPosition]);

    return (
        <img
            src={require("./boat.png")}
            className="boat-image noselect"
            style={{
                position: "absolute",
                left: `${boatPosition}px`,
                top: "70vh",
            }}
        />
    );
};

export default Boat;
