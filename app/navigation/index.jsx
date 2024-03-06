import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import MainNavigation from './mainNavigation';
import {NativeBaseProvider, StatusBar} from 'native-base';
import theme from '../config/theme';
import {Provider} from 'react-redux';
import store from '../store';
import {Platform} from 'react-native';

export default function AppRoot() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <StatusBar
          backgroundColor="#02851f"
          translucent={Platform.OS === 'android' ? true : false}
        />
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
