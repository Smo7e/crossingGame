import React, { useState, useReducer } from "react";
import Human from "./Human";
import Lose from "./Lose";
import Win from "./Win";
import "./boat.gif";
import { relative } from "path";
export enum ERole {
    F1 = "f1",
    D1 = "d1",
    F2 = "f2",
    D2 = "d2",
    F3 = "f3",
    D3 = "d3",
    EMPTY = "empty",
}
export enum EResultGame {
    WIN,
    LOSE,
    PLAYING,
}
export interface IPerson {
    id: number;
    name: ERole;
    positionX: number;
}

export const positionHuman = {
    leftBank: [0, 0.05, 0.1, 0.15, 0.2, 0.25].map((percent) => percent * window.innerWidth),
    leftBoat: [0.3, 0.35].map((percent) => percent * window.innerWidth),
    rightBoat: [0.6, 0.65].map((percent) => percent * window.innerWidth),
    rightBank: [0.7, 0.75, 0.8, 0.85, 0.9, 0.95].map((percent) => percent * window.innerWidth),
};
const Game: React.FC = () => {
    const [isGoBoat, setIsGoBoat] = useState<boolean>(false);

    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [stateGame, setStateGame] = useState<EResultGame>(EResultGame.PLAYING);
    const [leftCoastArr, setLeftCoast] = useState<IPerson[]>([
        { id: 1, name: ERole.F1, positionX: positionHuman.leftBank[0] },
        { id: 2, name: ERole.D1, positionX: positionHuman.leftBank[1] },
        { id: 3, name: ERole.F2, positionX: positionHuman.leftBank[2] },
        { id: 4, name: ERole.D2, positionX: positionHuman.leftBank[3] },
        { id: 5, name: ERole.F3, positionX: positionHuman.leftBank[4] },
        { id: 6, name: ERole.D3, positionX: positionHuman.leftBank[5] },
    ]);
    const [rightCoastArr, setRightCoastArr] = useState<IPerson[]>([
        { id: 1, name: ERole.EMPTY, positionX: 0 },
        { id: 2, name: ERole.EMPTY, positionX: 0 },
        { id: 3, name: ERole.EMPTY, positionX: 0 },
        { id: 4, name: ERole.EMPTY, positionX: 0 },
        { id: 5, name: ERole.EMPTY, positionX: 0 },
        { id: 6, name: ERole.EMPTY, positionX: 0 },
    ]);
    const [boatArr, setBoatArr] = useState<IPerson[]>([
        { id: 1, name: ERole.EMPTY, positionX: 0 },
        { id: 2, name: ERole.EMPTY, positionX: 0 },
    ]);
    let [boatPosition, setBoatPosition] = useState<boolean>(false);

    const go = (): void => {
        if (boatArr[0].name === ERole.EMPTY && boatArr[1].name === ERole.EMPTY) {
            return;
        }

        const newBoatPosition = !boatPosition;

        const arrLeft = !newBoatPosition ? leftCoastArr.concat(boatArr) : leftCoastArr;
        const arrRight = newBoatPosition ? rightCoastArr.concat(boatArr) : rightCoastArr;
        consoleResult();
        checkResult(arrLeft);
        checkResult(arrRight);

        setBoatPosition(newBoatPosition);

        boatArr.map((el, index) => {
            if (!boatPosition) {
                el.positionX = positionHuman.rightBoat[index];
            } else {
                el.positionX = positionHuman.leftBoat[index];
            }
        });
        setIsGoBoat(true);
        forceUpdate();
    };
    const checkResult = (persons: IPerson[]) => {
        persons.forEach((elem) => {
            if (elem.name[0] === "d") {
                const constructedValue = `f${elem.name[1]}`;
                const arrFathers = persons.filter((el) => {
                    return el.name[0] === "f";
                });
                if (
                    arrFathers.filter((el) => {
                        return el.name != constructedValue;
                    }).length > 0 &&
                    !arrFathers.find((el) => {
                        return el.name === constructedValue;
                    })
                ) {
                    console.log(1);

                    setStateGame(EResultGame.LOSE);
                }
            }
        });
    };
    const swap = (person: IPerson): any => {
        const resultPosition = 0;
        let freePosition: number = 0;
        if (boatArr[0].name === person.name || boatArr[1].name === person.name) {
            let currentboatPosition: number = boatArr[0].name === person.name ? 0 : 1;
            if (!boatPosition) {
                leftCoastArr.forEach((elem, index) => {
                    if (elem.name === ERole.EMPTY) {
                        freePosition = index;
                    }
                });
                leftCoastArr[freePosition] = person;
                person.positionX = positionHuman.leftBank[freePosition];
                boatArr[currentboatPosition] = { id: 2, name: ERole.EMPTY, positionX: 0 };
            } else {
                rightCoastArr.forEach((elem, index) => {
                    if (elem.name === ERole.EMPTY) {
                        freePosition = index;
                    }
                });
                rightCoastArr[freePosition] = person;
                person.positionX = positionHuman.rightBank[freePosition];

                boatArr[currentboatPosition] = { id: 2, name: ERole.EMPTY, positionX: 0 };
            }
        } else {
            if (boatArr[0].name !== ERole.EMPTY && boatArr[1].name !== ERole.EMPTY) {
                return;
            }
            const freePosition: number = boatArr[0].name === ERole.EMPTY ? 0 : 1;

            let currentArr: IPerson[] = [{ id: 6, name: ERole.EMPTY, positionX: 0 }];
            let indexElem = null;
            if (!boatPosition) {
                leftCoastArr.forEach((elem, index) => {
                    if (elem.name === person.name) {
                        currentArr = leftCoastArr;
                        indexElem = index;
                        boatArr[freePosition] = person;
                        person.positionX = positionHuman.leftBoat[freePosition];

                        currentArr[indexElem] = { id: 2, name: ERole.EMPTY, positionX: 0 };
                    }
                });
            } else {
                rightCoastArr.forEach((elem, index) => {
                    if (elem.name === person.name) {
                        currentArr = rightCoastArr;
                        indexElem = index;
                        boatArr[freePosition] = person;
                        person.positionX = positionHuman.rightBoat[freePosition];
                        currentArr[indexElem] = { id: 2, name: ERole.EMPTY, positionX: 0 };
                    }
                });
            }
        }
        forceUpdate();
        return null;

        //consoleResult();
    };
    const goBoat = () => {
        return 1;
    };
    const consoleResult = () => {
        console.log(leftCoastArr, boatArr, rightCoastArr);
    };
    const restartGame = () => {
        setStateGame(EResultGame.PLAYING);
        setBoatPosition(false);
        setLeftCoast([
            { id: 1, name: ERole.F1, positionX: 0 },
            { id: 2, name: ERole.D1, positionX: 15 },
            { id: 3, name: ERole.F2, positionX: 30 },
            { id: 4, name: ERole.D2, positionX: 45 },
            { id: 5, name: ERole.F3, positionX: 60 },
            { id: 6, name: ERole.D3, positionX: 75 },
        ]);
        setRightCoastArr([
            { id: 1, name: ERole.EMPTY, positionX: 0 },
            { id: 2, name: ERole.EMPTY, positionX: 0 },
            { id: 3, name: ERole.EMPTY, positionX: 0 },
            { id: 4, name: ERole.EMPTY, positionX: 0 },
            { id: 5, name: ERole.EMPTY, positionX: 0 },
            { id: 6, name: ERole.EMPTY, positionX: 0 },
        ]);
        setBoatArr([
            { id: 5, name: ERole.EMPTY, positionX: 0 },
            { id: 6, name: ERole.EMPTY, positionX: 0 },
        ]);
    };

    return (
        <>
            {stateGame === EResultGame.PLAYING ? (
                <></>
            ) : stateGame === EResultGame.LOSE ? (
                <Lose onRestart={restartGame} />
            ) : (
                <Win onRestart={restartGame} />
            )}

            <div>
                <div style={{ display: "flex" }}>
                    {leftCoastArr
                        .concat(rightCoastArr)
                        .concat(boatArr)
                        .map((elem, index) => {
                            return elem.name != ERole.EMPTY ? (
                                <Human
                                    person={elem}
                                    swap={swap}
                                    key={`${elem.id}-${elem.name}`}
                                    goBoat={goBoat}
                                    isGoBoat={isGoBoat}
                                />
                            ) : (
                                <div key={`${elem.id}-${elem.name}-${index}`} />
                            );
                        })}
                </div>
                <div>
                    {/* Лодка с гифкой */}
                    <div className="boat">
                        <img
                            src={require("./boat.gif")}
                            className="boat-image"
                            style={{
                                position: "relative",
                                left: "30vw",
                                top: "65vh",
                            }}
                        />
                    </div>
                </div>
                <button onClick={() => go()} style={{ position: "absolute", bottom: 100 }}>
                    Переправить лодку
                </button>
            </div>
        </>
    );
};
export default Game;
