import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Asset } from 'expo';
import { Video } from 'expo-av';

interface PlayerProps {
  currentMedia: Asset;
}

const Player: React.ForwardRefRenderFunction<Video, PlayerProps> = (
  { currentMedia },
  ref
) => {
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
