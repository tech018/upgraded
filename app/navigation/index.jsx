import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import MainNavigation from './mainNavigation';
import {NativeBaseProvider} from 'native-base';
import theme from '../config/theme';

export default function AppRoot() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
