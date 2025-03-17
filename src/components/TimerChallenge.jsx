import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

//Using a global variable to store the timerId is not a good idea because it will be overwritten if you have multiple timers running at the same time.
// let timerId;
export default function TimerChallenge({ title, targetTime }) {
  //To be component instance specific, use useRef instead of a global variable to store the timerId, but at the same time, unlike variables defined inside the component functions, this ref will not be reset or cleared when this component is re-rendered. instead, just like with state values React will store these timer values in memory and keep track of them [behind the scenes and make sure they are not lost between re-renders].
  const timer = useRef();
  const dialog = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  // let timerId;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }
  function handleReset() {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    // timer.current = setTimeout(() => {
    //   setTimerExpired(true);
    //   dialog.current.open();
    //   setTimerStarted(false);
    // }, targetTime * 1000);

    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
      // if (timeRemaining <= 0) {
      //   clearInterval(timer.current);
      //   dialog.current.open();
      // }
    }, 10);
    // setTimerStarted(true);
  }

  function handelStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      {/* {timerExpired && ( */}
      <ResultModal
        ref={dialog}
        // result={timeRemaining <= 0 ? 'Lost' : 'Won'}
        targetTime={targetTime}
        timeRemaining={timeRemaining}
        onReset={handleReset}
      />
      {/* )} */}
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timerExpired && <p>You Lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime === 1 ? '' : 's'}
        </p>
        <p>
          <button onClick={timerIsActive ? handelStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running out! 🏃‍♂️' : 'timer inactive '}
        </p>
      </section>
    </>
  );
}
