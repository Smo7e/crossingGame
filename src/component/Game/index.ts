export enum ERole {
    F,
    S1,
    S2,
    EMPTY,
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
    leftBank: [0, 0.05, 0.1].map((percent) => percent * window.innerWidth),
    leftBoat: [0.25, 0.3].map((percent) => percent * window.innerWidth),
    rightBoat: [0.7, 0.75].map((percent) => percent * window.innerWidth),
    rightBank: [0.75, 0.75, 0.75, 0.85, 0.9, 0.95].map((percent) => percent * window.innerWidth),
};
window.addEventListener("resize", () => {
    positionHuman = {
        leftBank: [0, 0.05, 0.1].map((percent) => percent * window.innerWidth),
        leftBoat: [0.25, 0.3].map((percent) => percent * window.innerWidth),
        rightBoat: [0.7, 0.75].map((percent) => percent * window.innerWidth),
        rightBank: [0.75, 0.75, 0.75, 0.85, 0.9, 0.95].map((percent) => percent * window.innerWidth),
    };
});

export const getDefaultLeftCoastArr = () => {
    return [
        { id: 1, name: ERole.F, positionX: positionHuman.leftBank[0], canSwim: true },
        { id: 2, name: ERole.S1, positionX: positionHuman.leftBank[1], canSwim: true },
        { id: 3, name: ERole.S2, positionX: positionHuman.leftBank[2], canSwim: true },
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
