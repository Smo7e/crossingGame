import React, { useState, useReducer, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Person {
    id: number;
    name: string;
    positionX: number;
    positionLocale: EPosition;
}
enum EPosition {
    LEFTBANK,
    LEFTBOAT,
    RIGHTBOAT,
    RIGHTBANK,
}
interface IPositionHuman {
    leftBank: number[];
    leftBoat: number[];
    rightBoat: number[];
    rightBank: number[];
}

const Test: React.FC = () => {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [vievWidth, setVievWidth] = useState<number>(1000);
    const [positionHuman, setPositionHuman] = useState<IPositionHuman>({
        leftBank: [0, 15, 30, 45, 60, 75],
        leftBoat: [300, 400],
        rightBoat: [600, 700],
        rightBank: [1000, 1015, 1030, 1045, 1060, 1075],
    });

    const [boatIsLeft, setBoatIsLeft] = useState(true);
    const firstItemRef = useRef<HTMLDivElement>(null);

    const [mainArr, setMainArr] = useState<Person[]>([
        { id: 1, name: "d1", positionX: 0, positionLocale: EPosition.LEFTBANK },
        { id: 2, name: "d2", positionX: 0, positionLocale: EPosition.LEFTBANK },
        { id: 3, name: "d3", positionX: 0, positionLocale: EPosition.LEFTBANK },
        { id: 4, name: "f1", positionX: 0, positionLocale: EPosition.LEFTBANK },
        { id: 5, name: "f2", positionX: 0, positionLocale: EPosition.LEFTBANK },
        { id: 6, name: "f3", positionX: 0, positionLocale: EPosition.LEFTBANK },
    ]);
    const [boat, setBoat] = useState<{
        left: null | Person;
        right: null | Person;
    }>({
        left: null,
        right: null,
    });

    const moveTo = (person: Person) => {
        switch (person.positionLocale) {
            case EPosition.LEFTBANK:
                if (Object.values(boat).filter((a) => a).length < 2) {
                    const freePositionBoat = !boat.left ? 0 : 1;
                    boat[!freePositionBoat ? "left" : "right"] = person;
                    const div = person.id - (!freePositionBoat ? 3 : 4);
                    person.positionX = positionHuman?.leftBoat[freePositionBoat] + Math.abs(div * 30);
                    console.log(positionHuman?.leftBoat[freePositionBoat] - Math.abs(div * 30));
                    console.log(positionHuman?.leftBoat[freePositionBoat], Math.abs(div * 30));

                    forceUpdate();
                    return;
                }
                break;
            case EPosition.LEFTBOAT:
                break;
            case EPosition.RIGHTBOAT:
                break;
            case EPosition.RIGHTBANK:
                break;
            default:
                break;
        }

        forceUpdate();
    };
    // const moveToBoatRight = (person: Person) => {
    //     setRightBank(rightBank.filter((p) => p.id !== person.id));
    //     setBoatArr([...boat, person]);

    //     person.animateLeft = distance;
    //     person.animateRight = 0;

    //     forceUpdate();
    // };

    // const outTheBoatLeft = (person: Person) => {
    //     setBoatArr(boat.filter((p) => p.id !== person.id));
    //     setLeftBank([...leftBank, person]);
    //     person.animateLeft = 0;
    //     person.animateRight = -distance;
    // };
    // const outTheBoatRight = (person: Person) => {
    //     setBoatArr(boat.filter((p) => p.id !== person.id));
    //     setRightBank([...rightBank, person]);

    //     person.animateLeft = 0;
    //     person.animateRight = -distance;
    // };
    // const goToRightBank = () => {
    //     //setBoatIsLeft(false);
    //     leftBank[0].animateLeft += 10;
    //     console.log(1);
    //     forceUpdate();
    // };
    useEffect(() => {
        setVievWidth(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));

        // if (firstItemRef.current && secondItemRef.current) {
        //     const firstRect = firstItemRef.current.getBoundingClientRect();
        //     const secondRect = secondItemRef.current.getBoundingClientRect();
        //     const distanceBetween = secondRect.left - firstRect.right;
        //     console.log(distanceBetween);
        //     setDistance(distanceBetween);
        // }
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "200px",
            }}
        >
            <div ref={firstItemRef}>
                <h2>Левый берег</h2>
                <ul
                    style={{
                        listStyleType: "none",
                        padding: 0,
                        display: "flex",
                    }}
                >
                    {mainArr.map((person) => (
                        <motion.li
                            style={{ marginLeft: 30 }}
                            key={person.id}
                            onClick={() => moveTo(person)}
                            initial={{ opacity: 1, x: 0 }}
                            animate={{ opacity: 1, x: person.positionX }}
                            exit={{ opacity: 1, x: 0 }} // Переплытие вправо
                            transition={{ duration: 2 }} // Длительность анимации
                        >
                            {person.name}
                        </motion.li>
                    ))}
                </ul>
            </div>
            {/* {boatIsLeft ? (
                <div
                    style={{ position: "relative", width: "300px" }}
                    ref={secondItemRef}
                >
                    <h2>Лодка Слева</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {boat.map((person) => (
                            <motion.li
                                key={person.id}
                                onClick={() => outTheBoatLeft(person)}
                                initial={{ opacity: 1, x: -distance }} // Начальное положение справа
                                animate={{ opacity: 1, x: person.animateRight }} // Появление на левом берегу
                                exit={{ opacity: 1, x: 0 }} // Уход влево
                                transition={{ duration: 2 }} // Длительность анимации
                            >
                                {person.name}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div style={{ position: "relative", width: "300px" }}>
                    <h2>Лодка Справа</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {boat.map((person) => (
                            <motion.li
                                key={person.id}
                                onClick={() => outTheBoatRight(person)}
                                initial={{ opacity: 1, x: 0 }} // Начальное положение справа
                                animate={{ opacity: 1, x: 300 }} // Появление на левом берегу
                                exit={{ opacity: 1, x: 0 }} // Уход влево
                                transition={{ duration: 2 }} // Длительность анимации
                            >
                                {person.name}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )}
            <div style={{ position: "relative", width: "300px" }}>
                <h2>правый берег</h2>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {rightBank.map((person) => (
                        <motion.li
                            key={person.id}
                            onClick={() => moveToBoatRight(person)}
                            initial={{ opacity: 1, x: -distance * 2 }}
                            animate={{ opacity: 1, x: person.animateLeft }}
                            exit={{ opacity: 1, x: 0 }} // Переплытие вправо
                            transition={{ duration: 2 }} // Длительность анимации
                        >
                            {person.name}
                        </motion.li>
                    ))}
                </ul>
            </div> */}
            <button
                style={{
                    position: "absolute",
                    left: 0,
                    top: 300,
                    width: 100,
                    height: 100,
                    backgroundColor: "red",
                }}

                // onClick={() => goToRightBank()}
            ></button>
            <div
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "red",
                    position: "absolute",
                    left: 430,
                    opacity: 0.1,
                }}
            ></div>
        </div>
    );
};

export default Test;
