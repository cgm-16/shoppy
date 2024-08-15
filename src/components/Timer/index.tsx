import { useState, useEffect } from "react";

export type TimerProps = {
  endTime: string;
};

export const useTimer = (endTime: string) => {
  const INTERVAL = 1000; // 1 second
  const calculateTimeLeft = () => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    return difference > 0 ? difference : 0;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        return 0;
      }
      setTimeLeft(newTimeLeft);
    }, INTERVAL);

    return () => clearInterval(timer);
  });

  return timeLeft;
};
