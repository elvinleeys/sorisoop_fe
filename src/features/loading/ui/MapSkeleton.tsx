export default function MapSkeleton() {
    return (
        <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 390 844"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="grid"
                    width="30"
                    height="30"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 30 0 L 0 0 0 30"
                        fill="none"
                        stroke="#d0d9e2"
                        strokeWidth="0.5"
                    />
                </pattern>
            </defs>
            <rect width="390" height="844" fill="#eaf0f6" />
            <rect width="390" height="844" fill="url(#grid)" />
            {/* Roads */}
            <rect x="0" y="280" width="390" height="20" fill="#dce8f0" />
            <rect x="140" y="0" width="20" height="844" fill="#dce8f0" />
            <rect x="260" y="0" width="16" height="844" fill="#dce8f0" />
            <rect x="0" y="480" width="390" height="14" fill="#dce8f0" />
            {/* Building blocks */}
            <rect x="30" y="80" width="70" height="45" rx="4" fill="#f0f4f8" />
            <rect x="30" y="145" width="50" height="60" rx="4" fill="#f0f4f8" />
            <rect
                x="180"
                y="100"
                width="60"
                height="70"
                rx="4"
                fill="#f0f4f8"
            />
            <rect x="290" y="80" width="80" height="55" rx="4" fill="#f0f4f8" />
            <rect x="30" y="330" width="90" height="80" rx="4" fill="#f0f4f8" />
            <rect
                x="200"
                y="320"
                width="70"
                height="100"
                rx="4"
                fill="#f0f4f8"
            />
            <rect
                x="300"
                y="340"
                width="70"
                height="55"
                rx="4"
                fill="#f0f4f8"
            />
            <rect x="30" y="520" width="60" height="70" rx="4" fill="#f0f4f8" />
            <rect
                x="170"
                y="510"
                width="80"
                height="90"
                rx="4"
                fill="#f0f4f8"
            />
            <rect
                x="290"
                y="530"
                width="80"
                height="60"
                rx="4"
                fill="#f0f4f8"
            />
        </svg>
    );
}
