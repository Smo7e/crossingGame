import { useState, useReducer, useEffect } from "react";
import Human from "./Human";
export enum ERole {
    F1 = "f1",
    D1 = "d1",
    F2 = "f2",
    D2 = "d2",
    F3 = "f3",
    D3 = "d3",
    EMPTY = "empty",
}
const Game = () => {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

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
        boatPosition = !boatPosition;
        console.log(boatPosition);
        forceUpdate();
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
                console.log("win");
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
            let indexElem = 0;
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
            if (!currentArr) return;
            boatArr[freePosition] = name;
            currentArr[indexElem] = ERole.EMPTY;
        }
        forceUpdate();

        consoleResult();
    };
    const consoleResult = () => {
        console.log(leftCoastArr, boatArr, rightCoastArr);
    };
    return (
        <>
            <button onClick={() => {}}> test</button>
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
