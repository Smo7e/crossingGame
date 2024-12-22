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
}

const Human: React.FC<IHumanProps> = memo(({ forceTpPersons, person, swap, isGoBoat, setIsGoBoat }) => {
    const [leftOnRightWalk, setLeftOnRightWalk] = useState<boolean>(false);
    const [correctX, setCorrectX] = useState<number>(person.positionX);
    const [stand, spriteGif]: string[] = useSprites(person.name);
    const [currentSprites, setCurrentSprite] = useState(stand);
    const animationFrameId = useRef<number | null>(null); // Добавляем ref для хранения ID requestAnimationFrame

    const asd = () => {
        swap(person);
    };

    const goBoat = () => {
        const eps = 5;
        if (isGoBoat.isGo) {
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
        goBoat();

        if (forceTpPersons) setCorrectX(person.positionX);

        const eps = 2;
        if (Math.abs(correctX - person.positionX) <= eps) {
            //isGoBoat.isGo = false;
            setIsGoBoat({ ...isGoBoat, isGo: false });
            person.canSwim = true;
            setCurrentSprite(stand);
            cancelAnimationFrame(animationFrameId.current!); // Останавливаем анимацию, когда достигнут целевой X
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
        // Запуск анимации
        animationFrameId.current = requestAnimationFrame(calc);

        // Очищаем animationFrame при размонтировании компонента
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
