import { useState, useRef } from "react";

const useTimer = (initialState) => {
  const [timer, setTimer] = useState(initialState);
  const countRef = useRef(null);

  const startTimer = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(countRef.current);
  };

  const resetTimer = () => {
    clearInterval(countRef.current);
    setTimer(0);
  };

  return { timer, startTimer, pauseTimer, resetTimer };
};

export default useTimer;
