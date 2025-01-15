import { memo, useEffect, useState, useRef } from "react";
import { IIsGoBoat, IPerson } from "../../index";
import { positionHuman } from "../..";
import useSprites from "../../../../module/hooks/useSprites/useSprites";

interface IHumanProps {
    forceTpPersons: boolean;
    person: IPerson;
    swap: Function;
    isGoBoat: IIsGoBoat;
    setIsGoBoat: Function;
    controls: { a: boolean; b: Function };
}

const Human: React.FC<IHumanProps> = memo(({ forceTpPersons, person, swap, isGoBoat, setIsGoBoat, controls }) => {
    const [leftOnRightWalk, setLeftOnRightWalk] = useState<boolean>(false);
    const [correctX, setCorrectX] = useState<number>(person.positionX);
    const [stand, spriteGif]: string[] = useSprites(person.name);
    const [currentSprites, setCurrentSprite] = useState(stand);
    const animationFrameId = useRef<number | null>(null); // Добавляем ref для хранения ID requestAnimationFrame

    const asd = () => {
        if (!controls) return;
        swap(person);
    };

    const goBoat = () => {
        const eps = 5;

        if (isGoBoat.isGo) {
            console.log(2);
            if (person.positionX == positionHuman.rightBoat[0] || person.positionX == positionHuman.leftBoat[0]) {
                setIsGoBoat({ ...isGoBoat, needPosition: correctX });
            } else if (
                person.positionX == positionHuman.rightBoat[1] ||
                person.positionX == positionHuman.leftBoat[1]
            ) {
                setIsGoBoat({ ...isGoBoat, needPosition: correctX - window.innerWidth * 0.05 });
            }
        }
    };

    const calc = () => {
        if (forceTpPersons) {
            setIsGoBoat({ ...isGoBoat, isGo: false });
            setCorrectX(person.positionX);
            return;
        }
        goBoat();

        const eps = 2;
        if (Math.abs(correctX - person.positionX) <= eps) {
            //isGoBoat.isGo = false;
            setIsGoBoat({ ...isGoBoat, isGo: false });
            person.canSwim = true;
            setCurrentSprite(stand);
            cancelAnimationFrame(animationFrameId.current!);
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

            animationFrameId.current = requestAnimationFrame(calc);
        }
    };

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(calc);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
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
                    top: "75vh",
                    zIndex: 1000,
                    transform: `scale(${!leftOnRightWalk ? 1 : -1}, 1)`,
                    height: "5vw",
                    width: "5vw",
                }}
            />
        </>
    );
});
export default Human;
