export interface DecibelOption {
  label: string;       // 화면에 표시될 한글 이름
  iconSrc: string;     // 아이콘 경로
  decibelLv: "quiet" | "moderate" | "loud"; // store와 매핑
}

export const options: DecibelOption[] = [
    { 
        label: "0~70dB (조용함)", 
        iconSrc: "/icons/filter/decibel/quiet.svg", 
        decibelLv: "quiet" 
    },
    { 
        label: "70~100dB (보통)", 
        iconSrc: "/icons/filter/decibel/moderate.svg", 
        decibelLv: "moderate" 
    },
    { 
        label: "100~120dB (시끄러움)", 
        iconSrc: "/icons/filter/decibel/loud.svg", 
        decibelLv: "loud" 
    },
];