import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';

import socket from '../../services/websockets';
import Player from '../../components/Player';
import { VideoStatus } from '../../components/Player/types.interface';

interface IMedia {
  path: string;
  fileName: string;
}

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

    socket.on('controller-media-change', async (data: IMedia) => {
      setCurrentMedia(data.path);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Player ref={playerRef} currentMedia={currentMedia} />
    </View>
  );
};

export default PlayerPage;
