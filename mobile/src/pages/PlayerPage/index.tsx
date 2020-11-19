import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';

import Player from '../../components/Player';

interface IMedia {
  path: string;
  fileName: string;
}

const PlayerPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMedia, setCurrentMedia] = useState('suits');

  const playerRef = useRef<Video>(null);

  return (
    <View style={{ flex: 1 }}>
      <Player ref={playerRef} currentMedia={currentMedia} />
    </View>
  );
};

export default PlayerPage;
