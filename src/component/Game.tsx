import React, { useState, useReducer, useEffect, useRef } from "react";
import Human from "./Human";
import Lose from "./Lose";
import Win from "./Win";
import "./boat.gif";
import "./Game.css";
import Boat from "./Boat";
import { getDefaultLeftCoastArr, getDefaultEmptyBoad, getDefaultEmptyArr, positionHuman } from ".";
import { ERole } from ".";
import GameTimer from "./GameTimer";
export enum EResultGame {
    WIN,
    LOSE,
    PLAYING,
}
export interface IPerson {
    id: number;
    name: ERole;
    positionX: number;
    canSwim: boolean;
}

export interface IIsGoBoat {
    isGo: boolean;
    goLeft: boolean;
    needPosition: number;
}
const Game: React.FC = () => {
    const gameTimerRef = useRef<any>(null);
    const [isGoBoat, setIsGoBoat] = useState<IIsGoBoat>({
        isGo: false,
        goLeft: false,
        needPosition: positionHuman.leftBoat[0],
    });

    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [stateGame, setStateGame] = useState<EResultGame>(EResultGame.PLAYING);
    const [leftCoastArr, setLeftCoast] = useState<IPerson[]>(getDefaultLeftCoastArr());
    const [rightCoastArr, setRightCoastArr] = useState<IPerson[]>(getDefaultEmptyArr());
    const [boatArr, setBoatArr] = useState<IPerson[]>(getDefaultEmptyBoad());
    let [boatPosition, setBoatPosition] = useState<boolean>(false);

    const go = (): void => {
        makeMove();

        if (
            (boatArr[0].name === ERole.EMPTY && boatArr[1].name === ERole.EMPTY) ||
            leftCoastArr
                .concat(boatArr)
                .concat(rightCoastArr)
                .filter((el) => el.name != ERole.EMPTY && el.canSwim === true).length !== 6
        ) {
            console.log(
                leftCoastArr
                    .concat(boatArr)
                    .concat(rightCoastArr)
                    .filter((el) => el.name != ERole.EMPTY && el.canSwim === true).length === 6
            );
            return;
        }
        console.log(
            leftCoastArr
                .concat(boatArr)
                .concat(rightCoastArr)
                .filter((el) => el.name != ERole.EMPTY && el.canSwim === true)
        );
        isGoBoat.isGo = true;

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
                    setStateGame(EResultGame.LOSE);
                }
            }
        });
    };
    const swap = (person: IPerson): any => {
        makeMove();
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
                person.canSwim = false;
                boatArr[currentboatPosition] = getDefaultEmptyBoad()[1];
            } else {
                rightCoastArr.forEach((elem, index) => {
                    if (elem.name === ERole.EMPTY) {
                        freePosition = index;
                    }
                });
                rightCoastArr[freePosition] = person;
                person.positionX = positionHuman.rightBank[freePosition];
                person.canSwim = false;

                boatArr[currentboatPosition] = getDefaultEmptyBoad()[1];
            }
        } else {
            if (boatArr[0].name !== ERole.EMPTY && boatArr[1].name !== ERole.EMPTY) {
                return;
            }
            const freePosition: number = boatArr[0].name === ERole.EMPTY ? 0 : 1;

            let currentArr: IPerson[] = [getDefaultEmptyBoad()[1]];
            let indexElem = null;
            if (!boatPosition) {
                leftCoastArr.forEach((elem, index) => {
                    if (elem.name === person.name) {
                        currentArr = leftCoastArr;
                        indexElem = index;
                        boatArr[freePosition] = person;
                        person.positionX = positionHuman.leftBoat[freePosition];
                        person.canSwim = false;

                        currentArr[indexElem] = getDefaultEmptyBoad()[1];
                    }
                });
            } else {
                rightCoastArr.forEach((elem, index) => {
                    if (elem.name === person.name) {
                        currentArr = rightCoastArr;
                        indexElem = index;
                        boatArr[freePosition] = person;
                        person.positionX = positionHuman.rightBoat[freePosition];
                        person.canSwim = false;

                        currentArr[indexElem] = getDefaultEmptyBoad()[1];
                    }
                });
            }
        }
        forceUpdate();
        return null;

        //consoleResult();
    };
    useEffect(() => {
        window.addEventListener("resize", () => {
            updatePositionsBeforeResize();
            console.log(2);
        });
    });

    const consoleResult = () => {};
    const restartGame = () => {
        setStateGame(EResultGame.PLAYING);
        setBoatPosition(false);
        setLeftCoast(getDefaultLeftCoastArr());
        setRightCoastArr(getDefaultEmptyArr());
        setBoatArr(getDefaultEmptyBoad());
    };
    const updatePositionsBeforeResize = () => {
        leftCoastArr.forEach((person, index) => {
            if (person.name !== ERole.EMPTY) {
                person.positionX = positionHuman.leftBank[index];
            }
        });

        rightCoastArr.forEach((person, index) => {
            if (person.name !== ERole.EMPTY) {
                person.positionX = positionHuman.rightBank[index];
            }
        });

        boatArr.forEach((person, index) => {
            if (person.name !== ERole.EMPTY) {
                person.positionX = boatPosition ? positionHuman.leftBoat[index] : positionHuman.rightBoat[index];
            }
        });
    };
    const makeMove = () => {
        console.log(22);
        if (gameTimerRef.current) {
            gameTimerRef.current.incrementMoves();
        }
    };

    const getStats = () => {
        if (gameTimerRef.current) {
            const stats = gameTimerRef.current.getGameStats();
            console.log(stats);
        }
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
                                <Human person={elem} swap={swap} key={`${elem.id}-${elem.name}`} isGoBoat={isGoBoat} />
                            ) : (
                                <div key={`${elem.id}-${elem.name}-${index}`} />
                            );
                        })}
                </div>

                <button onClick={() => go()} className="button-49">
                    Переправить лодку
                </button>
            </div>
            <Boat isGoBoat={isGoBoat} />
            <GameTimer ref={gameTimerRef} />
        </>
    );
};
export default Game;
