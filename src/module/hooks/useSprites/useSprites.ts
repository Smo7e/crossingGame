import { ERole } from "../../../component/Game";
import daughter1 from "./images/daughter1.png";
import daughter2 from "./images/daughter2.png";
import daughter3 from "./images/daughter3.png";
import father1 from "./images/father1.png";
import father2 from "./images/father2.png";
import father3 from "./images/father3.png";

export interface ISpriteData {
    x: number;
    y: number;
    width: number;
    height: number;
}
const useSprites = (name: ERole): [string, ISpriteData[], ISpriteData[]] => {
    let spriteImage;
    let spriteData: ISpriteData[] = Array(9)
        .fill(1)
        .map((el, index) => ({ x: 64 * index, y: 64 * 11, width: 64, height: 64 }));
    const stand = [{ x: 64, y: 64 * 10, width: 64, height: 64 }];
    switch (name) {
        case ERole.D1:
            spriteImage = daughter1;
            break;
        case ERole.D2:
            spriteImage = daughter2;
            break;
        case ERole.D3:
            spriteImage = daughter3;
            break;
        case ERole.F1:
            spriteImage = father1;
            break;
        case ERole.F2:
            spriteImage = father2;
            break;
        case ERole.F3:
            spriteImage = father3;
            break;

        default:
            spriteImage = daughter2;
            break;
    }

    return [spriteImage, spriteData, stand];
};

export default useSprites;
