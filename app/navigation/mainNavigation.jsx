import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuthNavigation from './auth/auth.navigation';
import ApplicationNavigation from './application/application.navigation';
import DashboardNavigation from './dashboard/dashboard.navigation';

const RootStack = createNativeStackNavigator();

export default function MainNavigation() {
  const {Navigator, Screen} = RootStack;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AuthStack">
      <Screen name="AuthStack" component={AuthNavigation} />
      <Screen name="ApplicationStack" component={ApplicationNavigation} />
      <Screen name="DashBoardStack" component={DashboardNavigation} />
    </Navigator>
  );
}
