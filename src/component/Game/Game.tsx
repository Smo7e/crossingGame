import React, { useState, useReducer, useEffect, useRef } from "react";

import Human from "./component/Human/Human";
import Lose from "./component/ResultGame/Lose";
import Win from "./component/ResultGame/Win";
import Boat from "./component/Boat/Boat";
import GameTimer, { IGameStats } from "./component/GamerTimer/GameTimer";

import {
    getDefaultLeftCoastArr,
    getDefaultEmptyBoad,
    getDefaultEmptyArr,
    positionHuman,
    IIsGoBoat,
    EResultGame,
    IPerson,
    getDefaultIsGoBoat,
} from ".";
import { ERole } from ".";

import "./Game.css";

const Game: React.FC<{ onStartGame: Function }> = ({ onStartGame }) => {
    const gameTimerRef = useRef<any>(null);
    const [isGoBoat, setIsGoBoat] = useState<IIsGoBoat>(getDefaultIsGoBoat());

    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [stateGame, setStateGame] = useState<EResultGame>(EResultGame.PLAYING);
    const [leftCoastArr, setLeftCoast] = useState<IPerson[]>(getDefaultLeftCoastArr());
    const [rightCoastArr, setRightCoastArr] = useState<IPerson[]>(getDefaultEmptyArr());
    const [boatArr, setBoatArr] = useState<IPerson[]>(getDefaultEmptyBoad());
    let [boatPosition, setBoatPosition] = useState<boolean>(false);
    const [forceTpPersons, setforceTpPersons] = useState(false);

    const go = (): void => {
        makeMove();

        if (
            (boatArr[0].name === ERole.EMPTY && boatArr[1].name === ERole.EMPTY) ||
            leftCoastArr
                .concat(boatArr)
                .concat(rightCoastArr)
                .filter((el) => el.name != ERole.EMPTY && el.canSwim === true).length !== 6
        ) {
            return;
        }

        isGoBoat.isGo = true;
        isGoBoat.goLeft = !isGoBoat.goLeft;

        const newBoatPosition = !boatPosition;

        const arrLeft = !newBoatPosition ? leftCoastArr.concat(boatArr) : leftCoastArr;
        const arrRight = newBoatPosition ? rightCoastArr.concat(boatArr) : rightCoastArr;
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
        if (rightCoastArr.filter((el) => el.name != ERole.EMPTY).length === 6) {
            setStateGame(EResultGame.WIN);
        }
        forceUpdate();

        return null;
    };
    useEffect(() => {
        const handleResize = () => {
            updatePositionsBeforeResize();

            isGoBoat.needPosition = !isGoBoat.goLeft
                ? positionHuman.leftBoat[0]
                : positionHuman.rightBank[0] - window.innerWidth * 0.15;

            setforceTpPersons(true);

            setTimeout(() => {
                setforceTpPersons(false);
            }, 500);
            forceUpdate();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const restartGame = () => {
        setStateGame(EResultGame.PLAYING);
        resetData();

        setLeftCoast(getDefaultLeftCoastArr());
        setRightCoastArr(getDefaultEmptyArr());
        setBoatArr(getDefaultEmptyBoad());

        setIsGoBoat(getDefaultIsGoBoat());
        setBoatPosition(false);
        setforceTpPersons(true);

        setTimeout(() => {
            setforceTpPersons(false);
        }, 500);
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
                person.positionX = !boatPosition ? positionHuman.leftBoat[index] : positionHuman.rightBoat[index];
            }
        });
    };
    const makeMove = () => {
        if (gameTimerRef.current) {
            gameTimerRef.current.incrementMoves();
        }
    };

    const getStats = (): IGameStats => {
        if (gameTimerRef.current) {
            return gameTimerRef.current.getGameStats();
        }
        return {
            moves: 0,
            time: 0,
        };
    };
    const resetData = () => {
        if (gameTimerRef.current) {
            gameTimerRef.current.resetData();
        }
    };
    return (
        <>
            {stateGame === EResultGame.PLAYING ? (
                <></>
            ) : stateGame === EResultGame.LOSE ? (
                <Lose onRestart={restartGame} />
            ) : (
                <Win gameStats={getStats()} onRestart={restartGame} />
            )}

            <div>
                <div style={{ display: "flex" }}>
                    {leftCoastArr
                        .concat(rightCoastArr)
                        .concat(boatArr)
                        .map((elem, index) => {
                            return elem.name != ERole.EMPTY ? (
                                <Human
                                    forceTpPersons={forceTpPersons}
                                    person={elem}
                                    swap={swap}
                                    key={`${elem.id}-${elem.name}`}
                                    isGoBoat={isGoBoat}
                                />
                            ) : (
                                <div key={`${elem.id}-${elem.name}-${index}`} />
                            );
                        })}
                </div>

                <button onClick={() => go()} className="button-49" style={{ zIndex: 50 }}>
                    Переправить лодку
                </button>
            </div>
            <Boat isGoBoat={isGoBoat} />
            <GameTimer ref={gameTimerRef} />
            <button
                onClick={() => onStartGame(false)}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                Главное меню
            </button>
            {/* <button onClick={() => setStateGame(EResultGame.WIN)} style={{ marginLeft: 300 }}>
                peins
            </button> */}
        </>
    );
};
export default Game;
