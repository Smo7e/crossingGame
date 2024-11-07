import { ERole } from "./Game";

interface IHumanProps {
    name: ERole;
    swap: Function;
}
const Human: React.FC<IHumanProps> = ({ name, swap }) => {
    return (
        <div
            style={{
                width: 50,
                height: 50,
                backgroundColor: "red",
                marginLeft: 10,
            }}
            onClick={() => swap(name)}
        >
            {name}
        </div>
    );
};
export default Human;
