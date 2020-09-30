import React, { useEffect, forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Asset } from 'expo';
import { Video } from 'expo-av';

interface PlayerProps {
  currentMedia: Asset;
  state: PlayerState;
}

export interface PlayerState {
  paused: boolean;
}

const INITIAL_STATE: PlayerState = {
  paused: true,
};

const Player: React.ForwardRefRenderFunction<Video, PlayerProps> = (
  { currentMedia, state = INITIAL_STATE },
  ref
) => {
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Video
        ref={ref}
        source={currentMedia}
        resizeMode="contain"
        shouldPlay
        isLooping
        useNativeControls
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};
export default forwardRef(Player);
