import React, { useState, useReducer, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Person {
    id: number;
    name: string;
    animateLeft: number;
    animateRight: number;
}

const Test: React.FC = () => {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [boatIsLeft, setBoatIsLeft] = useState(true);
    const firstItemRef = useRef<HTMLDivElement>(null);
    const secondItemRef = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState<number>(0);

    const [leftBank, setLeftBank] = useState<Person[]>([
        { id: 1, name: "d1", animateLeft: 0, animateRight: 0 },
        { id: 2, name: "d2", animateLeft: 0, animateRight: 0 },
        { id: 3, name: "d3", animateLeft: 0, animateRight: 0 },
        { id: 4, name: "f1", animateLeft: 0, animateRight: 0 },
        { id: 5, name: "f2", animateLeft: 0, animateRight: 0 },
        { id: 6, name: "f3", animateLeft: 0, animateRight: 0 },
    ]);
    const [boat, setBoatArr] = useState<Person[]>([]);
    const [rightBank, setRightBank] = useState<Person[]>([]);

    const moveToBoatLeft = (person: Person) => {
        setLeftBank(leftBank.filter((p) => p.id !== person.id));
        setBoatArr([...boat, person]);

        // person.animateLeft = distance;
        // person.animateRight = 0;

        forceUpdate();
    };
    const moveToBoatRight = (person: Person) => {
        setRightBank(rightBank.filter((p) => p.id !== person.id));
        setBoatArr([...boat, person]);

        person.animateLeft = distance;
        person.animateRight = 0;

        forceUpdate();
    };

    const outTheBoatLeft = (person: Person) => {
        setBoatArr(boat.filter((p) => p.id !== person.id));
        setLeftBank([...leftBank, person]);
        person.animateLeft = 0;
        person.animateRight = -distance;
    };
    const outTheBoatRight = (person: Person) => {
        setBoatArr(boat.filter((p) => p.id !== person.id));
        setRightBank([...rightBank, person]);

        person.animateLeft = 0;
        person.animateRight = -distance;
    };
    const goToRightBank = () => {
        setBoatIsLeft(false);
        console.log(1);
    };
    useEffect(() => {
        console.log(1);
        if (firstItemRef.current && secondItemRef.current) {
            const firstRect = firstItemRef.current.getBoundingClientRect();
            const secondRect = secondItemRef.current.getBoundingClientRect();
            const distanceBetween = secondRect.left - firstRect.right;
            console.log(distanceBetween);
            setDistance(distanceBetween);
        }
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
            <div
                style={{ position: "relative", width: "300px" }}
                ref={firstItemRef}
            >
                <h2>Левый берег</h2>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {leftBank.map((person) => (
                        <motion.li
                            key={person.id}
                            onClick={() => moveToBoatLeft(person)}
                            initial={{ opacity: 1, x: distance }}
                            animate={{ opacity: 1, x: person.animateLeft }}
                            exit={{ opacity: 1, x: 0 }} // Переплытие вправо
                            transition={{ duration: 2 }} // Длительность анимации
                        >
                            {person.name}
                        </motion.li>
                    ))}
                </ul>
            </div>
            {boatIsLeft ? (
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
                                initial={{ opacity: 1, x: distance }} // Начальное положение справа
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
            </div>
            <button
                style={{
                    position: "absolute",
                    left: 0,
                    top: 300,
                    width: 100,
                    height: 100,
                    backgroundColor: "red",
                }}
                onClick={() => goToRightBank()}
            ></button>
        </div>
    );
};

export default Test;
