export default function WaveformIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="[&_rect]:origin-bottom [&_rect]:animate-barBounce"
        >
            {[
                { x: 2, h: 8, delay: "0s" },
                { x: 6, h: 14, delay: "0.12s" },
                { x: 10, h: 18, delay: "0.24s" },
                { x: 14, h: 14, delay: "0.36s" },
                { x: 18, h: 8, delay: "0.48s" },
            ].map(({ x, h, delay }, i) => (
                <rect
                    key={i}
                    x={x}
                    y={(24 - h) / 2}
                    width="2.5"
                    height={h}
                    rx="1.25"
                    fill="#3b82f6"
                    style={{ animationDelay: delay }}
                />
            ))}
        </svg>
    );
}
