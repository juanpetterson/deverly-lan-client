import React, { useEffect, forwardRef, useState } from 'react';
import Plyr from 'plyr';

import 'plyr/dist/plyr.css';

const Player: React.ForwardRefRenderFunction<HTMLVideoElement> = (props, ref) => {
  const [media, setMedia] = useState();
  useEffect(() => {
    const player = new Plyr('#player', {
      controls: [
        'play-large',
        'restart',
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'mute',
        'volume',
        'fullscreen',
      ],
    });
  }, []);

  return (
    <div>
      <video id='player' ref={ref}>
        <source src={require(`../../assets/medias/suits.mp4`)} type='video/mp4' />
      </video>
    </div>
  );
};

export default forwardRef(Player);
