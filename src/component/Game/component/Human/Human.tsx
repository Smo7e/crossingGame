import { IIsGoBoat, IPerson } from "../../index";
import { memo, useEffect, useState } from "react";
import { ERole, positionHuman } from "../..";
import useSprites from "../../../../module/hooks/useSprites/useSprites";

interface IHumanProps {
    forceTpPersons: boolean;
    person: IPerson;
    swap: Function;
    isGoBoat: IIsGoBoat;
}

const Human: React.FC<IHumanProps> = memo(({ forceTpPersons, person, swap, isGoBoat }) => {
    const [leftOnRightWalk, setLeftOnRightWalk] = useState<boolean>(false);
    const [correctX, setCorrectX] = useState<number>(person.positionX);
    const [stand, spriteGif]: string[] = useSprites(person.name);
    const [currentSprites, setCurrentSprite] = useState(stand);
    const asd = () => {
        swap(person);
    };
    const goBoat = () => {
        const eps = 5;
        if (isGoBoat.isGo) {
            if (person.positionX == positionHuman.rightBoat[0] || person.positionX == positionHuman.leftBoat[0]) {
                isGoBoat.needPosition = correctX;
            } else if (
                person.positionX == positionHuman.rightBoat[1] ||
                person.positionX == positionHuman.leftBoat[1]
            ) {
                isGoBoat.needPosition = correctX - window.innerWidth * 0.05;
            }
        }
    };
    const calc = (interval1: any) => {
        if (forceTpPersons) setCorrectX(person.positionX);

        const eps = 5;
        if (Math.abs(correctX - person.positionX) <= eps) {
            isGoBoat.isGo = false;
            person.canSwim = true;
            setCurrentSprite(stand);
            clearInterval(interval1);
        } else {
            if (!isGoBoat.isGo) {
                setCurrentSprite(spriteGif);
            }

            if (correctX < person.positionX) {
                setLeftOnRightWalk(true);
                setCorrectX((prevCorrectX) => prevCorrectX + eps);
            } else {
                setLeftOnRightWalk(false);
                setCorrectX((prevCorrectX) => prevCorrectX - eps);
            }
        }
    };

    useEffect(() => {
        const interval1 = setInterval(() => {
            calc(interval1);
            goBoat();
        }, 15);

        return () => {
            clearInterval(interval1);
        };
    }, [person.positionX, correctX]);

    return (
        <>
            <img
                className="noselect"
                src={currentSprites}
                onClick={asd}
                style={{
                    position: "fixed",
                    left: correctX,
                    top: "70vh",
                    zIndex: 100,
                    transform: `scale(${leftOnRightWalk ? 1 : -1}, 1)`,
                    height: "5vw",
                    width: "5vw",
                }}
            />
        </>
    );
});
export default Human;
