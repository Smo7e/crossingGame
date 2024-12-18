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
    canSwim: boolean;
}

export interface IIsGoBoat {
    isGo: boolean;
    goLeft: boolean;
    needPosition: number;
}
export let positionHuman = {
    leftBank: [0, 0.05, 0.1, 0.15, 0.2, 0.25].map((percent) => percent * window.innerWidth),
    leftBoat: [0.3, 0.35].map((percent) => percent * window.innerWidth),
    rightBoat: [0.55, 0.6].map((percent) => percent * window.innerWidth),
    rightBank: [0.7, 0.75, 0.8, 0.85, 0.9, 0.95].map((percent) => percent * window.innerWidth),
};
window.addEventListener("resize", () => {
    positionHuman = {
        leftBank: [0, 0.05, 0.1, 0.15, 0.2, 0.25].map((percent) => percent * window.innerWidth),
        leftBoat: [0.3, 0.35].map((percent) => percent * window.innerWidth),
        rightBoat: [0.55, 0.6].map((percent) => percent * window.innerWidth),
        rightBank: [0.7, 0.75, 0.8, 0.85, 0.9, 0.95].map((percent) => percent * window.innerWidth),
    };
});

export const getDefaultLeftCoastArr = () => {
    return [
        { id: 1, name: ERole.F1, positionX: positionHuman.leftBank[0], canSwim: true },
        { id: 2, name: ERole.D1, positionX: positionHuman.leftBank[1], canSwim: true },
        { id: 3, name: ERole.F2, positionX: positionHuman.leftBank[2], canSwim: true },
        { id: 4, name: ERole.D2, positionX: positionHuman.leftBank[3], canSwim: true },
        { id: 5, name: ERole.F3, positionX: positionHuman.leftBank[4], canSwim: true },
        { id: 6, name: ERole.D3, positionX: positionHuman.leftBank[5], canSwim: true },
    ];
};
export const getDefaultEmptyArr = () => {
    return [
        { id: 1, name: ERole.EMPTY, positionX: 0, canSwim: true },
        { id: 2, name: ERole.EMPTY, positionX: 0, canSwim: true },
        { id: 3, name: ERole.EMPTY, positionX: 0, canSwim: true },
        { id: 4, name: ERole.EMPTY, positionX: 0, canSwim: true },
        { id: 5, name: ERole.EMPTY, positionX: 0, canSwim: true },
        { id: 6, name: ERole.EMPTY, positionX: 0, canSwim: true },
    ];
};
export const getDefaultEmptyBoad = () => {
    return [
        { id: 1, name: ERole.EMPTY, positionX: 0, canSwim: true },
        { id: 2, name: ERole.EMPTY, positionX: 0, canSwim: true },
    ];
};
export const getDefaultIsGoBoat = () => {
    return {
        isGo: false,
        goLeft: false,
        needPosition: positionHuman.leftBoat[0],
    };
};
