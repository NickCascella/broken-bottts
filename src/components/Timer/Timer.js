import { useEffect } from "react";
import useTimer from "../../hooks/Timer";
import formatTime from "../../utils/formatTime";

const Timer = ({ setTime, levelsCompleted }) => {
  const { timer, startTimer, pauseTimer, resetTimer } = useTimer(0);
  useEffect(() => {
    setTimeout(() => {
      startTimer();
    }, 11000);
  }, []);

  useEffect(() => {
    if (levelsCompleted === 4) {
      pauseTimer();
      setTime(timer);
    }
  }, [levelsCompleted]);

  return <>{formatTime(timer)}</>;
};

export default Timer;
