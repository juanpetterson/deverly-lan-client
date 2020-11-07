import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PlayerPage from './pages/PlayerPage';
import ComingSoon from './pages/ComingSoon';
import Gallery from './pages/Gallery';
import colors from './styles/colors';

const { Navigator, Screen } = createBottomTabNavigator();
// const { Navigator, Screen } = createMaterialBottomTabNavigator();

function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Navigator
        tabBarOptions={{
          style: {
            height: 60,
            backgroundColor: colors.primary,
            borderTopWidth: 0,
          },
          tabStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          iconStyle: {
            flex: 0,
            width: 20,
            height: 20,
          },
          labelStyle: {
            fontFamily: 'roboto_400',
            fontSize: 11,
            marginTop: 5,
          },
          inactiveTintColor: colors.gray,
          activeTintColor: colors.black,
        }}
      >
        <Screen
          name="Browse"
          component={Gallery}
          options={{
            tabBarLabel: 'Browse',
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-browsers" color={color} size={26} />
            ),
          }}
        />
        <Screen
          name="Player"
          component={PlayerPage}
          options={{
            tabBarLabel: 'Player',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="play-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Screen
          name="favorite"
          component={ComingSoon}
          options={{
            tabBarLabel: 'Favorite',
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-heart" color={color} size={26} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
