import React from 'react';
import { Image } from 'react-native';

import IMedia from '../../models/media.interface';
import DefaultThumbnail from '../../../assets/default-thumbnail.jpg';

import { List, CategoryContainer, CategoryImage, CategoryName } from './styles';

interface ListProps {
  data: IMedia[];
}

interface ItemProps {
  item: IMedia;
}

const CategoryList: React.FC<ListProps> = ({ data = [] }) => {
  const CategoryItem: React.FC<ItemProps> = ({ item }) => (
    <CategoryContainer>
      <CategoryImage source={DefaultThumbnail} />
      <CategoryName numberOfLines={1}>{item.fileName}</CategoryName>
    </CategoryContainer>
  );

  return (
    <List>
      {data.map((item) => (
        <CategoryItem key={item.fileName} item={item} />
      ))}
    </List>
  );
};

export default CategoryList;
