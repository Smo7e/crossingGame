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
    const leftCoastArr: ERole[] = [
        ERole.F1,
        ERole.D1,
        ERole.F2,
        ERole.D2,
        ERole.F3,
        ERole.D3,
    ];
    const rightCoastArr: ERole[] = [
        ERole.EMPTY,
        ERole.EMPTY,
        ERole.EMPTY,
        ERole.EMPTY,
        ERole.EMPTY,
        ERole.EMPTY,
    ];
    const boatArr: ERole[] = [ERole.EMPTY, ERole.EMPTY];

    let boatPosition: number = 0;
    const go = (result: ERole): void => {
        //67 - лодка
        // if (mainArr[6] === ERole.EMPTY && mainArr[7] === ERole.EMPTY) {
        //   console.log("в лодке никого нету");
        //   return;
        // }
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
            let indexElem = 0;
            leftCoastArr.forEach((elem, index) => {
                if (elem === name) {
                    currentArr = leftCoastArr;
                    indexElem = index;
                }
            });
            if (!currentArr) {
                rightCoastArr.forEach((elem, index) => {
                    if (elem === name) {
                        currentArr = leftCoastArr;
                        indexElem = index;
                    }
                });
            }
            if (!currentArr) return;
            boatArr[freePosition] = name;
            currentArr[indexElem] = ERole.EMPTY;
        }

        consoleResult();
    };
    const consoleResult = () => {
        console.log(leftCoastArr, boatArr, rightCoastArr);
    };
    return (
        <>
            <div style={{ display: "flex", width: 500, height: 500 }}>
                <Human name={ERole.F1} swap={swap} />
                <Human name={ERole.F2} swap={swap} />
                <Human name={ERole.F3} swap={swap} />
                <Human name={ERole.D1} swap={swap} />
                <Human name={ERole.D2} swap={swap} />
                <Human name={ERole.D3} swap={swap} />
            </div>
        </>
    );
};
export default Game;
