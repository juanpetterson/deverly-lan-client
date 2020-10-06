import React, { useEffect, useState } from 'react';
import { IMedia } from '../../models/media.interface';

import { Container } from './styles';

import mediasService from '../../services/mediasService';

import io from 'socket.io-client';
const socket = io('http://localhost:5000');

const MediaItem = ({ media, handleMediaClick }) => {
  return (
    <button onClick={handleMediaClick}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '120px',
          height: '120px',
          border: '1px solid lightgray',
          wordBreak: 'break-all',
          padding: '15px',
        }}>
        <span>{media.fileName}</span>
        <span>{media.path}</span>
      </div>
    </button>
  );
};

const Gallery: React.FC = () => {
  const [currentMedias, setCurrentMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    const loadMedias = async () => {
      const { data } = await mediasService.getAvailableMedias();

      setCurrentMedias(data);
    };

    loadMedias();
  }, []);

  const handleMediaClick = (media: IMedia) => {
    socket.emit('controller-media-change', media);

    console.log(media);
  };

  return (
    <Container>
      <h1>Gallery</h1>
      <div>
        {currentMedias &&
          currentMedias.map(media => {
            return (
              <MediaItem
                handleMediaClick={() => handleMediaClick(media)}
                key={media.fileName}
                media={media}
              />
            );
          })}
      </div>
    </Container>
  );
};

export default Gallery;
