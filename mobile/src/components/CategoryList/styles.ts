import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const List = styled.ScrollView.attrs({
  horizontal: true,
})`
  padding: 8px 0 24px;
`;
export const CategoryContainer = styled.TouchableOpacity`
  margin-right: 10px;
`;
export const CategoryImage = styled.Image`
  width: 130;
  height: 98px;
`;

export const CategoryName = styled.Text`
  max-width: 130px;
  color: ${colors.black};
  font-family: roboto_700;
  font-size: 12px;
  justify-content: center;
  align-items: center;
`;
