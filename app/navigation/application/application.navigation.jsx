import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import applicationScreens from '../application/config';

const ApplicationStack = createNativeStackNavigator();

export default function ApplicationNavigation() {
  const {Navigator, Screen} = ApplicationStack;

  return (
    <Navigator
      initialRouteName="APPLICATIONENTRY"
      screenOptions={{
        headerStyle: {backgroundColor: '#02851f'},
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      {applicationScreens.map(screen => (
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
