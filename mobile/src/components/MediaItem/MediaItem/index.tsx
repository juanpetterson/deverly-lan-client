import React from 'react';

import { Text, TouchableOpacity } from 'react-native';

import IMedia from '../../../models/media.interface';
import { Container } from './styles';

export interface Props {
  media: IMedia;
  handleMediaClick?: () => void;
}

const MediaItem: React.FC<Props> = ({ media, handleMediaClick }) => {
  return (
    <Container>
      <TouchableOpacity onPress={handleMediaClick}>
        <Text>{media.fileName}</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MediaItem;
