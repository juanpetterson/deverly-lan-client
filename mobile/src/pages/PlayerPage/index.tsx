import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import io from 'socket.io-client';

import Player, { PlayerState } from '../../components/Player';

const PlayerPage: React.FC = () => {
  const [currentMedia, setCurrentMedia] = useState('suits');
  const [playerState, setPlayerState] = useState<PlayerState>({ paused: true });
  const playerRef = useRef<Video>(null);
  useEffect(() => {
    setTimeout(() => {
      setCurrentMedia('enola-holmes');
    }, 5000);

    const socket = io('http://localhost:5000', { query: { user: 'logged user' } });
    socket.on('controller-play-pause', () => {
      const player = playerRef.current?.props;

      if (player?.paused) {
        setPlayerState({ ...playerState, paused: false });
      } else {
        setPlayerState({ ...playerState, paused: true });
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Player ref={playerRef} currentMedia={currentMedia} state={playerState} />
    </View>
  );
};

export default PlayerPage;
