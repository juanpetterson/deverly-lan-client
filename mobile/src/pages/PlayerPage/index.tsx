import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import io from 'socket.io-client';
import { Video } from 'expo-av';

import Player from '../../components/Player';
import { VideoStatus } from '../../components/Player/types.interface';

const socket = io(`http://10.0.3.2:5000`, {
  query: { user: 'logged user' },
});

const PlayerPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMedia, setCurrentMedia] = useState('suits');

  const playerRef = useRef<Video>(null);
  useEffect(() => {
    socket.on('controller-play-pause', async () => {
      const status = (await playerRef.current?.getStatusAsync()) as VideoStatus;

      if (status.isPlaying) {
        await playerRef.current?.pauseAsync();
      } else {
        await playerRef.current?.playAsync();
      }
    });

    socket.on('controller-stop', async () => {
      await playerRef.current?.stopAsync();
    });

    socket.on('controller-back', async () => {
      const status = (await playerRef.current?.getStatusAsync()) as VideoStatus;

      await playerRef.current?.setPositionAsync(status.positionMillis - 10000);
    });

    socket.on('controller-forward', async () => {
      const status = (await playerRef.current?.getStatusAsync()) as VideoStatus;

      await playerRef.current?.setPositionAsync(status.positionMillis + 10000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Player ref={playerRef} currentMedia={currentMedia} />
    </View>
  );
};

export default PlayerPage;
