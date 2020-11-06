import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import MediaItem from '../../components/MediaItem/MediaItem';
import IMedia from '../../models/media.interface';

import socket from '../../services/websockets';
import mediasService from '../../services/mediasService';
import { Container } from './styles';

const Gallery: React.FC = () => {
  const [currentMedias, setCurrentMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    GoogleCast.showCastDialog();

    const loadMedias = async () => {
      const { data } = await mediasService.getAvailableMedias();

      setCurrentMedias(data);
    };

    loadMedias();
  }, []);

  const handleMediaClick = (media: IMedia) => {
    console.log(media);
    socket.emit('controller-media-change', media);
  };

  return (
    <Container>
      <Text>Gallery</Text>
      <CastButton style={{ width: 30, height: 30 }} />
      <View>
        {currentMedias &&
          currentMedias.map((media) => {
            return (
              <MediaItem
                handleMediaClick={() => handleMediaClick(media)}
                key={media.fileName}
                media={media}
              />
            );
          })}
      </View>
    </Container>
  );
};

export default Gallery;
