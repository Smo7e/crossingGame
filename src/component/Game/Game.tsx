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
import { on } from "events";

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
    const [isAvailableCotrols, setIsAvailableCotrols] = useState<boolean>(true);
    const [oneRender, setOneRender] = useState<boolean>(true);
    useEffect(() => {}, [isGoBoat.needPosition]);
    const go = (): void => {
        if (!isAvailableCotrols) return;

        setIsAvailableCotrols(false);
        setTimeout(() => {
            setIsAvailableCotrols(true);
        }, 2500);

        if (
            (boatArr[0].name === ERole.EMPTY && boatArr[1].name === ERole.EMPTY) ||
            leftCoastArr
                .concat(boatArr)
                .concat(rightCoastArr)
                .filter((el) => el.name != ERole.EMPTY && el.canSwim === true).length !== 3
        ) {
            return;
        }

        isGoBoat.isGo = true;
        isGoBoat.goLeft = !isGoBoat.goLeft;

        const newBoatPosition = !boatPosition;
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
    const checkResult = () => {
        let count = 0;
        boatArr
            .filter((el) => el.name != ERole.EMPTY)
            .forEach((el) => {
                if (el.name === ERole.F) {
                    count += 2;
                } else {
                    count++;
                }
            });
        if (count > 2) {
            setStateGame(EResultGame.LOSE);
        }
        // if (countGuman > countHuman && countHuman > 0) {
        //     setStateGame(EResultGame.LOSE);
        // }
    };
    const swap = (person: IPerson): any => {
        if (!isAvailableCotrols) return;

        if (stateGame === EResultGame.LOSE || stateGame === EResultGame.WIN) return;
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
        if (rightCoastArr.filter((el) => el.name != ERole.EMPTY).length === 3) {
            setStateGame(EResultGame.WIN);
        }
        checkResult();
        forceUpdate();

        return null;
    };
    useEffect(() => {
        const handleResize = () => {
            if (!oneRender) return;
            setOneRender((el) => !el);
            setIsAvailableCotrols(false);
            updatePositionsBeforeResize();
            setIsGoBoat({
                ...isGoBoat,
                needPosition: !isGoBoat.goLeft
                    ? positionHuman.leftBoat[0]
                    : positionHuman.rightBank[0] - window.innerWidth * 0.05,
                isGo: true,
            });
            setforceTpPersons(true);

            setTimeout(() => {
                updatePositionsBeforeResize();
                setIsGoBoat({
                    ...isGoBoat,
                    needPosition: !isGoBoat.goLeft
                        ? positionHuman.leftBoat[0]
                        : positionHuman.rightBank[0] - window.innerWidth * 0.05,
                    isGo: true,
                });

                setOneRender(true);
                setforceTpPersons(false);
                setIsAvailableCotrols(true);
            }, 1000);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const restartGame = () => {
        if (!isAvailableCotrols) return;

        setStateGame(EResultGame.PLAYING);
        resetData();

        setLeftCoast(getDefaultLeftCoastArr());
        setRightCoastArr(getDefaultEmptyArr());
        setBoatArr(getDefaultEmptyBoad());
        setIsGoBoat({ ...getDefaultIsGoBoat(), isGo: true });

        setBoatPosition(false);
        setforceTpPersons(true);

        setTimeout(() => {
            setforceTpPersons(false);
        }, 500);
    };
    const updatePositionsBeforeResize = () => {
        setforceTpPersons(true);
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
        isGoBoat.needPosition = !boatPosition ? positionHuman.leftBoat[1] : positionHuman.rightBoat[1];
        setTimeout(() => {
            isGoBoat.needPosition = !boatPosition ? positionHuman.leftBoat[1] : positionHuman.rightBoat[1];
        }, 2000);
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
                                    setIsGoBoat={setIsGoBoat}
                                    controls={{ a: isAvailableCotrols, b: setIsAvailableCotrols }}
                                />
                            ) : (
                                <div key={`${elem.id}-${elem.name}-${index}`} />
                            );
                        })}
                </div>
            </div>
            <Boat go={go} isGoBoat={isGoBoat} forceTp={forceTpPersons} />
            <GameTimer ref={gameTimerRef} />

            <button onClick={() => onStartGame(false)} className="go-main-menu"></button>
            <button
                className="restart-game"
                onClick={() => {
                    restartGame();
                }}
            ></button>
        </>
    );
};
export default Game;
