import { IPerson, positionHuman } from "./Game";
import { memo, useEffect, useState } from "react";
import { ERole } from "./Game";
import useSprites, { ISpriteData } from "../module/hooks/useSprites/useSprites";

interface IHumanProps {
    person: IPerson;
    swap: Function;
    isGoBoat: boolean;
    goBoat: Function;
}

const Human: React.FC<IHumanProps> = memo(({ person, swap, isGoBoat }) => {
    const [correctX, setCorrectX] = useState<number>(person.positionX);
    const [activeSprite, setActiveSprite] = useState(0);
    const [spriteImage, spriteData, stand]: [string, ISpriteData[], ISpriteData[]] = useSprites(person.name);
    const [currentSprites, setCurrentSprite] = useState(useSprites(person.name)[2]);
    const [countFrame, setCountFrame] = useState(0);

    const asd = () => {
        swap(person);
    };
    const calc = (interval1: any) => {
        const eps = 5;
        setCountFrame(countFrame + 1);
        if (Math.abs(correctX - person.positionX) <= eps) {
            setCurrentSprite(stand);
            clearInterval(interval1);
        } else {
            setCurrentSprite(spriteData);

            if (correctX < person.positionX) {
                setCorrectX((prevCorrectX) => prevCorrectX + eps);
            } else {
                setCorrectX((prevCorrectX) => prevCorrectX - eps);
            }
        }
        if (countFrame % 5 === 0) {
            setActiveSprite((prevActiveSprite) => (prevActiveSprite + 1) % currentSprites.length);
        }
    };

    useEffect(() => {
        const interval1 = setInterval(() => {
            calc(interval1);
        }, 20);

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
                    transform: "scale(1, 1)",
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
