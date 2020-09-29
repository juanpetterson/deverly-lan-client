import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayerPage from './pages/PlayerPage';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PlayerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
