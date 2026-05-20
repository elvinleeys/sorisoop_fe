interface Props {
    label: string;
    value: string;
    align?: "start" | "end";
}

export default function DecibelValue({ label, value, align = "start" }: Props) {
    return (
        <div>
            <p className={`text-base text-neutral-sub text-${align}`}>
                {label}
            </p>

            <p className={`text-base text-neutral-sub text-${align}`}>
                {value}
            </p>
        </div>
    );
}
