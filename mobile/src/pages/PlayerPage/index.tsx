import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import io from 'socket.io-client';
import { Video } from 'expo-av';

import Player, { PlayerState } from '../../components/Player';

import media from '../../assets/medias/suits.mp4';

const socket = io(`http://10.0.3.2:5000`, {
  query: { user: 'logged user' },
});

const PlayerPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMedia, setCurrentMedia] = useState(media);
  const [playerState, setPlayerState] = useState<PlayerState>({ paused: true });
  const playerRef = useRef<Video>(null);
  useEffect(() => {
    socket.on('controller-play-pause', async () => {
      await playerRef.current?.playAsync();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Player ref={playerRef} currentMedia={currentMedia} state={playerState} />
    </View>
  );
};

export default PlayerPage;
