import React, { useState, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoogleCast, { CastButton } from 'react-native-google-cast';

import mediasService from '../../services/mediasService';

import IMedia from '../../models/media.interface';
import Header from '../../components/Header';
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
    const loadMedias = async () => {
      const { data } = await mediasService.getAvailableMedias();

      setCurrentMedias(data);
    };

    loadMedias();
  }, []);

  const handleMediaClick = (media: IMedia) => {
    GoogleCast.castMedia({
      mediaUrl: `http://192.168.15.177:5000/api/v1/video?media=${media.path}`,
    });

    navigation.navigate('Player');
  };

  const { data, indexes } = useMemo(() => {
    const items: Item[] = [
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
      <CastButton
        style={{
          width: 42,
          height: 42,
          backgroundColor: 'white',
          tintColor: 'black',
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 1,
        }}
      />
      <Container>
        <Header />
        <FlatList<Item>
          data={data}
          renderItem={({ item }) => item.render()}
          keyExtractor={(item) => item.key}
          stickyHeaderIndices={indexes}
        />
      </Container>
    </Wrapper>
  );
};

export default Gallery;
