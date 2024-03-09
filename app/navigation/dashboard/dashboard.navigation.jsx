import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DashboardScreens from './config';
import {Icon} from 'native-base';

const DashBoardStack = createBottomTabNavigator();

export default function DashboardNavigation() {
  const {Navigator, Screen} = DashBoardStack;
  return (
    <Navigator
      initialRoute="DASHBOARDSCREEN"
      screenOptions={{
        tabBarShowIcon: false, // true
        tabBarLabelStyle: {
          color: '#02851f',
          height: 1,
        },
        headerStyle: {backgroundColor: '#02851f'},
        headerTintColor: '#ffffff',
      }}>
      {DashboardScreens.map(screen => (
        <Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarLabel: screen.title,
            tabBarIcon: () => (
              <Icon
                as={MaterialIcons}
                name={screen.icon}
                size={8}
                color="primary.900"
              />
            ),
          }}
          component={screen.component}
        />
      ))}
    </Navigator>
  );
}
