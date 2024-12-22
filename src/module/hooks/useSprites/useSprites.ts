import { ERole } from "../../../component/Game";

import father from "./images/Father.png";
import son1 from "./images/Son1.png";
import son2 from "./images/Son2.png";

import fatherGif from "./images/Father.gif";
import son1Gif from "./images/Son1.gif";
import son2Gif from "./images/Son2.gif";

const useSprites = (name: ERole): string[] => {
    let resultSprite;
    switch (name) {
        case ERole.F:
            resultSprite = [father, fatherGif];
            break;
        case ERole.S1:
            resultSprite = [son1, son1Gif];
            break;
        case ERole.S2:
            resultSprite = [son2, son2Gif];
            break;

        default:
            resultSprite = [son2, son1Gif];
            break;
    }

    return resultSprite;
};

export default useSprites;
