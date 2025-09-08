import { useState, useEffect } from "react";
import { useMeasurementStore } from "@/store/measurement/measurementStore";

const INITIAL_TIME_IN_SECONDS = 15;

export const useMeasurementTimer = () => {
  const [remainingTime, setRemainingTime] = useState(INITIAL_TIME_IN_SECONDS);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { status, setStatus } = useMeasurementStore();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (status === "measuring") {
      // 15초에서 0초까지 카운트다운
      if (remainingTime > 0) {
        interval = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
      } 
      // 0초 이후부터 1초씩 증가
      else {
        interval = setInterval(() => {
          setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);
      }
    } else {
      // 측정 상태가 아니면 타이머 초기화
      setRemainingTime(INITIAL_TIME_IN_SECONDS);
      setElapsedTime(0);
    }

    if (status === "measuring" && remainingTime === 0 && elapsedTime >= 0) {
      // 15초가 지나면 상태를 'finished'로 변경
      // UI 명세에 따라 15초 후 자동으로 'finished'로 변경하도록 유지
      // 필요에 따라 이 로직은 삭제 가능
      setStatus("finished");
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status, remainingTime, elapsedTime, setStatus]);

  // 남은 시간이 있으면 카운트다운, 아니면 카운트업 시간을 포맷
  let formattedTime: string;
  if (remainingTime > 0) {
    formattedTime = `00:${remainingTime.toString().padStart(2, '0')}`;
  } else {
    formattedTime = `+00:${elapsedTime.toString().padStart(2, '0')}`;
  }
  
  return formattedTime;
};
