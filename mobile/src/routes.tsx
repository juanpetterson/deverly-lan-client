import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';

import PlayerPage from './pages/PlayerPage';
import Gallery from './pages/Gallery';

const Tab = createMaterialBottomTabNavigator();

function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Player"
        activeColor="#f0edf6"
        inactiveColor="#aaaaaa"
        barStyle={{ backgroundColor: '#282828' }}
      >
        <Tab.Screen
          name="Home"
          component={PlayerPage}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Gallery}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <FeatherIcons name="search" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
