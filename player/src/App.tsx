import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import Player from './components/Player';

const App: React.FC = () => {
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = io('http://localhost:5000', { query: { user: 'logged user' } });
    socket.on('controller-play-pause', () => {
      const player = playerRef.current;

      if (player?.paused) {
        player.play();
      } else {
        player?.pause();
      }
    });
  }, []);

  return (
    <>
      <Player ref={playerRef} />
    </>
  );
};

export default App;
