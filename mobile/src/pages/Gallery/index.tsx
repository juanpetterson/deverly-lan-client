import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import GoogleCast, { CastButton } from 'react-native-google-cast';

import socket from '../../services/websockets';
import mediasService from '../../services/mediasService';

import IMedia from '../../models/media.interface';
import Header from '../../components/Header';
import Heading from '../../components/Heading';
import Title from '../../components/Title';
import CategoryList from '../../components/CategoryList';

import { Wrapper, Container } from './styles';

interface Item {
  key: string;
  render: () => JSX.Element;
  isTitle?: boolean;
}

const Gallery: React.FC = () => {
  const navigation = useNavigation();
  const [currentMedias, setCurrentMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    // GoogleCast.showCastDialog();

    const loadMedias = async () => {
      const { data } = await mediasService.getAvailableMedias();

      setCurrentMedias(data);
    };

    loadMedias();
  }, []);

  const handleMediaClick = (media: IMedia) => {
    socket.emit('controller-media-change', media);
    navigation.navigate('Player');
  };

  const { data, indexes } = useMemo(() => {
    const items: Item[] = [
      {
        key: 'PAGE_HEADING',
        render: () => <Heading>Following</Heading>,
      },
      {
        key: 'FOLLOWED_CATEGORIES',
        render: () => <Title>Followed Categories</Title>,
        isTitle: true,
      },
      {
        key: 'C1',
        render: () => (
          <CategoryList data={currentMedias} onClickItem={handleMediaClick} />
        ),
      },
      {
        key: 'LIVE_CHANNELS',
        render: () => <Title>Live Channels</Title>,
        isTitle: true,
      },
      {
        key: 'C2',
        render: () => (
          <CategoryList data={currentMedias} onClickItem={handleMediaClick} />
        ),
      },
      {
        key: 'CONTINUE_WATCHING',
        render: () => <Title>Continue Watching</Title>,
        isTitle: true,
      },
      {
        key: 'C3',
        render: () => (
          <CategoryList data={currentMedias} onClickItem={handleMediaClick} />
        ),
      },
      {
        key: 'OFFLINE_CHANNELS',
        render: () => <Title>Offline Channels</Title>,
        isTitle: true,
      },
      {
        key: 'C4',
        render: () => (
          <CategoryList data={currentMedias} onClickItem={handleMediaClick} />
        ),
      },
    ];

    // indexes of the title elements
    const titleIndexes: number[] = [];

    items.forEach((item, index) => item.isTitle && titleIndexes.push(index));

    return {
      data: items,
      indexes: titleIndexes,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMedias]);

  return (
    <Wrapper>
      <Container>
        <Header />
        <FlatList<Item>
          data={data}
          renderItem={({ item }) => item.render()}
          keyExtractor={(item) => item.key}
          stickyHeaderIndices={indexes}
        />
        {/* <CastButton style={{ width: 30, height: 30 }} /> */}
      </Container>
    </Wrapper>
  );
};

export default Gallery;
