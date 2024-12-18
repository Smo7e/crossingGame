import { useEffect, useState } from "react";
import { IIsGoBoat, positionHuman } from "../../index";
import "./Boat.css";

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
    // useEffect(() => {
    //     const handleResize = () => {
    //         console.log(!isGoBoat.goLeft ? positionHuman.rightBoat[0] : positionHuman.rightBoat[0]);
    //         setBoatPosition(!isGoBoat.goLeft ? positionHuman.leftBoat[0] : positionHuman.rightBoat[0]);
    //     };
    //     window.addEventListener("resize", handleResize);
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // });

    return (
        <img
            src={require("./boat.png")}
            className="boat-image"
            style={{
                position: "absolute",
                left: `${boatPosition}px`,
                top: "70vh",
            }}
        />
    );
};

export default Boat;
