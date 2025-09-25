import { flexCol } from "@/mixin/style";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";
import { RadiusButton } from "soridam-design-system";


export default function RadiusSection() {
    const { selectedRadius, selectRadius } = useFilterDataStore();

    const options = ["300m이하", "500m이하", "1km이하"];
    const labelToRadiusMap: Record<string, 300 | 500 | 1000> = {
        "300m이하": 300,
        "500m이하": 500,
        "1km이하": 1000,
    };

    return (
        <div className={`${flexCol} gap-[0.625rem]`}>
            <p 
                className={`
                    font-medium
                    text-base
                    leading-[1.05rem]
                    text-neutral-black
                `}
            >
                반경
            </p>
            <ul 
                className={`
                    ${flexCol}
                    gap-[0.625rem]
                `}
            >
                {options.map((option) => {
                    const radiusValue = labelToRadiusMap[option];
                    return (
                        <li key={option}>
                            <RadiusButton
                                label={option}
                                active={selectedRadius === radiusValue}
                                onClick={() => selectRadius(radiusValue)}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
  );
}