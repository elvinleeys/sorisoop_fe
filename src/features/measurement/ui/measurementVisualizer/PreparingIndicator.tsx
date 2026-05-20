import CircleRing from "../preparing/CircleRing";
import MicIcon from "../preparing/MicIcon";

export default function PreparingIndicator() {
    return (
        <CircleRing spin strokeWidth={26}>
            <MicIcon />
        </CircleRing>
    );
}
