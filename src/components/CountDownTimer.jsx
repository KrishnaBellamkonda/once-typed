import React, { useState, useEffect, useRef } from "react";

function CountdownTimer({
  timeLeft,
  setTimeLeft,
  isTimerComplete,
  setIsTimerComplete,
  isTimerRunning, 
  setIsTimerRunning, 
  selectRef, 
  setInputText, 
  inputRef, 
  restartTimer

}) {

  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function startTimer() {
    setIsTimerRunning(old=>true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(intervalRef.current);
          setIsTimerRunning((old) => false);
          setIsTimerComplete((old) => true);
          return prevTimeLeft;
        }
      });
    }, 1001);
  }

  function handleTimeChange(event) {
    const timeInMinutes = Number(event.target.value);
    setTimeLeft((old) => timeInMinutes * 60);
  }


  return (
    <div className="">

      {
        !isTimerComplete ? (
          <>
          <button className="button" disabled={isTimerRunning} onClick={startTimer}>Start Timer</button>
          </>
        ) : (
          <button className="button" onClick={restartTimer}>Restart Timer</button>
        )
      }


    </div>
  );
}

export default CountdownTimer;
