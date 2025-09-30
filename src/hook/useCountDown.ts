import { useEffect, useRef, useState } from "react";

type Status = "idle" | "measuring" | "finished";

export function useCountdown(
  status: Status,
  initial: number = 15,
  onFinished?: () => void  // finished 시 호출되는 콜백
) {
  const [time, setTime] = useState(initial);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    clearInterval(intervalRef.current!);

    if (status === "idle") {
      setTime(initial);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [status, initial]);

  // 시간 기반 finished 처리
  useEffect(() => {
    if (status === "measuring" && time === 0) {
      if (onFinished) onFinished();  // 전역 상태 변경
    }
  }, [time, status, onFinished]);

  return time;
}