import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuthScreens from './config';

const AuthStack = createNativeStackNavigator();

export default function AuthNavigation() {
  const {Navigator, Screen} = AuthStack;

  return (
    <Navigator
      initialRouteName="AUTHLOGINSCREEN"
      screenOptions={{
        headerStyle: {backgroundColor: '#02851f'},
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      {AuthScreens.map(screen => (
        <Screen
          key={screen.name}
          name={screen.name}
          options={{title: screen.title}}
          component={screen.component}
        />
      ))}
    </Navigator>
  );
}
