import React, { useState, useReducer } from "react";
import Human from "./Human";
import Lose from "./Lose";
import Win from "./Win";
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
const Game: React.FC = () => {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [stateGame, setStateGame] = useState<EResultGame>(
        EResultGame.PLAYING
    );
    const [leftCoastArr, setLeftCoast] = useState<ERole[]>([
        ERole.F1,
        ERole.D1,
        ERole.F2,
        ERole.D2,
        ERole.F3,
        ERole.D3,
    ]);
    const [rightCoastArr, setRightCoastArr] = useState<ERole[]>([
        ERole.EMPTY,
        ERole.EMPTY,
        ERole.EMPTY,
        ERole.EMPTY,
        ERole.EMPTY,
        ERole.EMPTY,
    ]);
    const [boatArr, setBoatArr] = useState<ERole[]>([ERole.EMPTY, ERole.EMPTY]);
    let [boatPosition, setBoatPosition] = useState<boolean>(false);

    const go = (): void => {
        if (boatArr[0] === ERole.EMPTY && boatArr[1] === ERole.EMPTY) {
            return;
        }
        const newBoatPosition = !boatPosition;

        const arrLeft = !newBoatPosition
            ? leftCoastArr.concat(boatArr)
            : leftCoastArr;
        const arrRight = newBoatPosition
            ? rightCoastArr.concat(boatArr)
            : rightCoastArr;

        checkResult(arrLeft);
        checkResult(arrRight);

        setBoatPosition(newBoatPosition);
        forceUpdate();
    };
    const checkResult = (arr: ERole[]) => {
        arr.forEach((elem) => {
            if (elem[0] === "d") {
                const constructedValue = `f${elem[1]}`;

                if (
                    (Object.values(ERole) as string[]).includes(
                        constructedValue
                    ) &&
                    !arr.includes(constructedValue as ERole) &&
                    arr.filter((el) => {
                        return el[0] == "f";
                    }).length != 0
                ) {
                    setStateGame(EResultGame.LOSE);
                }
            }
        });
    };
    const swap = (name: ERole): void => {
        let freePosition: number = 0;
        if (boatArr[0] === name || boatArr[1] === name) {
            let currentboatPosition: number = boatArr[0] === name ? 0 : 1;
            if (!boatPosition) {
                leftCoastArr.forEach((elem, index) => {
                    if (elem === ERole.EMPTY) {
                        freePosition = index;
                    }
                });
                leftCoastArr[freePosition] = name;
                boatArr[currentboatPosition] = ERole.EMPTY;
            } else {
                rightCoastArr.forEach((elem, index) => {
                    if (elem === ERole.EMPTY) {
                        freePosition = index;
                    }
                });
                rightCoastArr[freePosition] = name;
                boatArr[currentboatPosition] = ERole.EMPTY;
            }
        } else {
            if (boatArr[0] !== ERole.EMPTY && boatArr[1] !== ERole.EMPTY) {
                return;
            }
            const freePosition: number = boatArr[0] === ERole.EMPTY ? 0 : 1;

            let currentArr: ERole[] = [ERole.EMPTY];
            let indexElem = null;
            if (!boatPosition) {
                leftCoastArr.forEach((elem, index) => {
                    if (elem === name) {
                        currentArr = leftCoastArr;
                        indexElem = index;
                    }
                });
            } else {
                rightCoastArr.forEach((elem, index) => {
                    if (elem === name) {
                        currentArr = rightCoastArr;
                        indexElem = index;
                    }
                });
            }

            if (!currentArr || indexElem === null) return;
            boatArr[freePosition] = name;
            currentArr[indexElem] = ERole.EMPTY;
        }
        forceUpdate();

        //consoleResult();
    };
    const consoleResult = () => {
        console.log(leftCoastArr, boatArr, rightCoastArr);
    };
    const restartGame = () => {
        setStateGame(EResultGame.PLAYING);
        setBoatPosition(false);
        setLeftCoast([
            ERole.F1,
            ERole.D1,
            ERole.F2,
            ERole.D2,
            ERole.F3,
            ERole.D3,
        ]);
        setRightCoastArr([
            ERole.EMPTY,
            ERole.EMPTY,
            ERole.EMPTY,
            ERole.EMPTY,
            ERole.EMPTY,
            ERole.EMPTY,
        ]);
        setBoatArr([ERole.EMPTY, ERole.EMPTY]);
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
                <p>Левый берег</p>
                <div style={{ display: "flex" }}>
                    {leftCoastArr.map((elem, index) => {
                        return elem !== ERole.EMPTY ? (
                            <Human
                                name={elem}
                                swap={swap}
                                key={Math.random() + index}
                            />
                        ) : (
                            <></>
                        );
                    })}
                </div>
            </div>
            <div>
                <p>Лодка</p>
                {boatPosition ? <>Справа</> : <>Слева</>}
                <button onClick={() => go()}>Переправить лодку</button>
                <div style={{ display: "flex" }}>
                    {boatArr.map((elem, index) => {
                        return elem !== ERole.EMPTY ? (
                            <Human
                                name={elem}
                                swap={swap}
                                key={Math.random() + index}
                            />
                        ) : (
                            <></>
                        );
                    })}
                </div>
            </div>
            <div>
                <p>Правый берег</p>
                <div style={{ display: "flex" }}>
                    {rightCoastArr.map((elem, index) => {
                        return elem !== ERole.EMPTY ? (
                            <Human name={elem} swap={swap} key={index} />
                        ) : (
                            <></>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default Game;
