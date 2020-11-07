/* eslint-disable camelcase */
import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import Routes from './routes';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    roboto_400: Roboto_400Regular,
    roboto_500: Roboto_500Medium,
    roboto_700: Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Routes />
      <StatusBar style="light" />
    </>
  );
}
