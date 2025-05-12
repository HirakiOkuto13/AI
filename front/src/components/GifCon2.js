import React, { useState } from 'react';

function GifControl2() {
  // Declare a state variable to store the paused state of the gif
  const [paused, setPaused] = useState(false);

  // Add an event handler to toggle the paused state
  const togglePaused = () => setPaused(!paused);

  return (
    <>
      <img src="https://media0.giphy.com/media/JtBZm3Getg3dqxK0zP/200w.gif?cid=6c09b952c2ajf1g22neybr9df1zf6ld9l0w8avx4f8t3ekc3&rid=200w.gif&ct=g" alt="Your gif description" className="img-fluid" style={{ visibility: paused ? 'hidden' : 'visible' }} width="600" height="300"/>
      <button onClick={togglePaused}>{paused ? 'Show' : 'Hide'}</button>
    </>
  );
}

export default GifControl2;


