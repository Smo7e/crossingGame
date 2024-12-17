import { IIsGoBoat, IPerson } from "./Game";
import { memo, useEffect, useState } from "react";
import { ERole, positionHuman } from ".";
import useSprites, { ISpriteData } from "../module/hooks/useSprites/useSprites";

interface IHumanProps {
    person: IPerson;
    swap: Function;
    isGoBoat: IIsGoBoat;
}

const Human: React.FC<IHumanProps> = memo(({ person, swap, isGoBoat }) => {
    const [leftOnRightWalk, setLeftOnRightWalk] = useState<boolean>(false);
    const [correctX, setCorrectX] = useState<number>(person.positionX);
    const [activeSprite, setActiveSprite] = useState(0);
    const [spriteImage, spriteData, stand]: [string, ISpriteData[], ISpriteData[]] = useSprites(person.name);
    const [currentSprites, setCurrentSprite] = useState(useSprites(person.name)[2]);
    const [countFrame, setCountFrame] = useState(0);
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
        const eps = 5;
        setCountFrame(countFrame + 1);
        if (Math.abs(correctX - person.positionX) <= eps) {
            isGoBoat.isGo = false;
            person.canSwim = true;
            setCurrentSprite(stand);
            clearInterval(interval1);
        } else {
            if (!isGoBoat.isGo) {
                setCurrentSprite(spriteData);
            }

            if (correctX < person.positionX) {
                setLeftOnRightWalk(true);
                setCorrectX((prevCorrectX) => prevCorrectX + eps);
            } else {
                setLeftOnRightWalk(false);

                setCorrectX((prevCorrectX) => prevCorrectX - eps);
            }
        }
        if (countFrame % 5 === 0) {
            setActiveSprite((prevActiveSprite) => (prevActiveSprite + 1) % currentSprites.length);
        }
    };

    useEffect(() => {
        console.log(1111);
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
            <div
                onClick={asd}
                style={{
                    position: "fixed",
                    left: correctX,
                    top: "70vh",
                    scale: 100,
                    transform: `scale(${leftOnRightWalk ? 1 : -1}, 1)`,
                    width: `${currentSprites[currentSprites.length == 1 ? 0 : activeSprite].width}px`,
                    height: `${currentSprites[currentSprites.length == 1 ? 0 : activeSprite].height}px`,
                    backgroundImage: `url(${spriteImage})`,
                    backgroundPosition: `${-currentSprites[currentSprites.length == 1 ? 0 : activeSprite]
                        .x}px ${-currentSprites[currentSprites.length == 1 ? 0 : activeSprite].y}px`,
                    backgroundSize: "832px 1344px",
                    zIndex: 100,
                }}
            />
        </>
    );
});
export default Human;
