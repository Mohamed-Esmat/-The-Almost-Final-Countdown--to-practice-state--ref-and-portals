import { useRef, useState } from 'react';

export default function Player() {
  //You can connect Refs to DOM elements and JSX elements
  const playerInput = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState('');
  // const [submitted, setSubmitted] = useState(false);

  // function handleChange(e) {
  //   setSubmitted(false);
  //   setEnteredPlayerName(e.target.value);
  // }

  function handelSubmit() {
    // setSubmitted(true);
    setEnteredPlayerName(playerInput.current.value);
    playerInput.current.value = '';
  }
  return (
    <section id="player">
      {/* {!submitted && <h2>Welcome unknown entity</h2>}
      {submitted && <h2>Welcome {enteredPlayerName}</h2>} */}
      {/* {!enteredPlayerName && <h2>Welcome unknown entity</h2>}
      {enteredPlayerName && <h2>Welcome {enteredPlayerName}</h2>} */}
      <h2>Welcome {enteredPlayerName || 'unknown entity'}</h2>
      <p>
        <input
          ref={playerInput}
          type="text"
          // value={enteredPlayerName}
          // onChange={(e) => handleChange(e)}
        />
        <button onClick={handelSubmit}>Set Name</button>
      </p>
    </section>
  );
}
