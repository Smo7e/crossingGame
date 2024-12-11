import { IPerson, positionHuman } from "./Game";
import { memo, useEffect, useState } from "react";
import { ERole } from "./Game";

interface IHumanProps {
    person: IPerson;
    swap: Function;
}

const Human: React.FC<IHumanProps> = memo(({ person, swap }) => {
    const [correctX, setCorrectX] = useState<number>(0);
    const [a, setA] = useState<number>(0);

    const asd = () => {
        swap(person);
        setA(a + 1);
        console.log(a);
    };

    useEffect(() => {
        const eps = 20;
        const interval = setInterval(() => {
            if (Math.abs(correctX - person.positionX) < eps) {
                clearInterval(interval);
            } else if (correctX < person.positionX) {
                setCorrectX(correctX + eps);
            } else {
                setCorrectX(correctX - eps);
            }
        }, 20);
        return () => clearInterval(interval);
    });

    return (
        <div
            style={{
                width: "5vw",
                height: "5vw",
                backgroundColor: "red",
                position: "fixed",
                left: correctX,
                top: 0,
                transition: "3s",
            }}
            onClick={asd}
        >
            {person.name}
        </div>
    );
});
export default Human;
