import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import MediaItem from '../../components/MediaItem/MediaItem';
import IMedia from '../../models/media.interface';

import socket from '../../services/websockets';
import mediasService from '../../services/mediasService';

import Header from '../../components/Header';
import Heading from '../../components/Heading';
import Title from '../../components/Title';
import CategoryList from '../../components/CategoryList';

import { Wrapper, Container, Main } from './styles';

interface Item {
  key: string;
  render: () => JSX.Element;
  isTitle?: boolean;
}

const Gallery: React.FC = () => {
  const [currentMedias, setCurrentMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    // GoogleCast.showCastDialog();

    const loadMedias = async () => {
      const { data } = await mediasService.getAvailableMedias();

      setCurrentMedias(data);
    };

    loadMedias();
  }, []);

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
        render: () => <CategoryList data={currentMedias} />,
      },
      {
        key: 'LIVE_CHANNELS',
        render: () => <Title>Live Channels</Title>,
        isTitle: true,
      },
      {
        key: 'C2',
        render: () => <CategoryList data={currentMedias} />,
      },
      {
        key: 'CONTINUE_WATCHING',
        render: () => <Title>Continue Watching</Title>,
        isTitle: true,
      },
      {
        key: 'C3',
        render: () => <CategoryList data={currentMedias} />,
      },
      {
        key: 'OFFLINE_CHANNELS',
        render: () => <Title>Offline Channels</Title>,
        isTitle: true,
      },
      {
        key: 'C4',
        render: () => <CategoryList data={currentMedias} />,
      },
    ];

    // indexes of the title elements
    // eslint-disable-next-line no-shadow
    const indexes: number[] = [];

    items.forEach((item, index) => item.isTitle && indexes.push(index));

    return {
      data: items,
      indexes,
    };
  }, [currentMedias]);

  // const handleMediaClick = (media: IMedia) => {
  //   console.log(media);
  //   socket.emit('controller-media-change', media);
  // };

  return (
    <Wrapper>
      <Container>
        <Header />
        <Main>
          <FlatList<Item>
            data={data}
            renderItem={({ item }) => item.render()}
            keyExtractor={(item) => item.key}
            stickyHeaderIndices={indexes}
            // Refresh Effect
            // onRefresh={() => {}}
            refreshing={false}
          />
        </Main>
        <Text style={{ color: 'white' }}>Gallery</Text>
        {/* <CastButton style={{ width: 30, height: 30 }} /> */}
        {/* <View>
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
        </View> */}
      </Container>
    </Wrapper>
  );
};

export default Gallery;
