import React, { useState } from 'react';

function GifControl() {
  // Declare a state variable to store the paused state of the gif
  const [paused, setPaused] = useState(false);

  // Add an event handler to toggle the paused state
  const togglePaused = () => setPaused(!paused);

  return (
    <>
      <img src="https://media0.giphy.com/media/9resXBcrl4LOTRK9KE/giphy.gif?cid=ecf05e47j9wx6qlc2z0p9kghlenwotb5ghkh49aob4yhono9&rid=giphy.gif&ct=g" alt="Your gif description" className="img-fluid" style={{ visibility: paused ? 'hidden' : 'visible' }} width="600" height="300"/>
      <button onClick={togglePaused}>{paused ? 'Show' : 'Hide'}</button>
    </>
  );
}

export default GifControl;


