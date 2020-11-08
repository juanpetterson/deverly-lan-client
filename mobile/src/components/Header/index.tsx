import React from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Text style={{ color: 'white', fontSize: 20 }}>Deverly</Text>
    </Container>
  );
};

export default Header;
