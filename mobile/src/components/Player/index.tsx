import React, { useEffect, forwardRef, useState } from 'react';
import { Text, View } from 'react-native';
import Video from 'react-native-video';

interface PlayerProps {
  currentMedia: any;
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
  ref,
) => {
  return (
    <View>
      <Video ref={ref} source={currentMedia} paused={state.paused} resizeMode="contain" />
    </View>
  );
};

export default forwardRef(Player);
