import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

interface PlayerProps {
  currentMedia: string;
}

const Player: React.ForwardRefRenderFunction<Video, PlayerProps> = (
  { currentMedia },
  ref
) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Video
        ref={ref}
        source={{
          uri: `http://10.0.2.2:5000/api/v1/video?media=${currentMedia}`,
        }}
        resizeMode="stretch"
        shouldPlay
        isLooping
        useNativeControls
        focusable
        isTVSelectable
        hasTVPreferredFocus
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};
export default forwardRef(Player);
