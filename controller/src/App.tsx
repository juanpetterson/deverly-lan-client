import React, { useState } from 'react';
import io from 'socket.io-client';
import Gallery from './components/Gallery';
const socket = io('http://localhost:5000');

interface State {
  paused: boolean;
}

const INITIAL_STATE: State = {
  paused: true,
};

const App: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleAction = (action: string) => {
    socket.emit(`controller-${action}`, 'play pressed');

    if (action === 'play-pause') {
      const newState = { ...state };
      newState.paused = !newState.paused;
      setState(newState);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleAction('play-pause')}>
          {state.paused ? 'Play' : 'Pause'}
        </button>
        <button onClick={() => handleAction('stop')}>Stop</button>
        <button onClick={() => handleAction('back')}>Back</button>
        <button onClick={() => handleAction('forward')}>Forward</button>
        <button onClick={() => handleAction('change-media')}>Toggle Media</button>
      </div>
      <Gallery />
    </div>
  );
};

export default App;
