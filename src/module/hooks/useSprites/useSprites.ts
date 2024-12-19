import { ERole } from "../../../component/Game";
import daughter1 from "./images/daughter1.gif";
import daughter2 from "./images/daughter2.gif";
import daughter3 from "./images/daughter3.gif";

import father1 from "./images/father1.gif";
import father2 from "./images/father2.gif";
import father3 from "./images/father3.gif";

import standDaughter1 from "./images/daughter1.png";
import standDaughter2 from "./images/daughter2.png";
import standDaughter3 from "./images/daughter3.png";

import standFather1 from "./images/father1.png";
import standFather2 from "./images/father2.png";
import standFather3 from "./images/father3.png";

const useSprites = (name: ERole): string[] => {
    let resultSprite;
    switch (name) {
        case ERole.D1:
            resultSprite = [standDaughter1, daughter1];
            break;
        case ERole.D2:
            resultSprite = [standDaughter2, daughter2];
            break;
        case ERole.D3:
            resultSprite = [standDaughter3, daughter3];
            break;
        case ERole.F1:
            resultSprite = [standFather1, father1];
            break;
        case ERole.F2:
            resultSprite = [standFather2, father2];
            break;
        case ERole.F3:
            resultSprite = [standFather3, father3];
            break;

        default:
            resultSprite = [standFather1, father1];
            break;
    }

    return resultSprite;
};

export default useSprites;
