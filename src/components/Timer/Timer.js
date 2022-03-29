import { useEffect } from "react";
import useTimer from "../../hooks/Timer";
import formatTime from "../../utils/formatTime";

const Timer = () => {
  const { timer, startTimer, pauseTimer, resetTimer } = useTimer(0);
  useEffect(() => {
    setTimeout(() => {
      startTimer();
    }, 11000);
  }, []);
  return <>{formatTime(timer)}</>;
};

export default Timer;
