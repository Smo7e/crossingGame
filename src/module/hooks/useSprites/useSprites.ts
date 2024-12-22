import { ERole } from "../../../component/Game";

import Guman from "./images/Guman.png";
import Human from "./images/Human.png";
import GumanGif from "./images/Guman.gif";
import HumanGif from "./images/Human.gif";

const useSprites = (name: ERole): string[] => {
    let resultSprite;
    switch (name) {
        case ERole.H1:
            resultSprite = [Human, HumanGif];
            break;
        case ERole.H2:
            resultSprite = [Human, HumanGif];
            break;
        case ERole.H3:
            resultSprite = [Human, HumanGif];
            break;
        case ERole.G1:
            resultSprite = [Guman, GumanGif];
            break;
        case ERole.G2:
            resultSprite = [Guman, GumanGif];
            break;
        case ERole.G3:
            resultSprite = [Guman, GumanGif];
            break;
        default:
            resultSprite = [Guman, GumanGif];
            break;
    }

    return resultSprite;
};

export default useSprites;
