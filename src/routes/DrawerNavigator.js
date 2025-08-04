import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomNavigation';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { useThemeContext } from '../context/ThemeContext';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { isDarkMode } = useThemeContext();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#F8FAFC',
          width: 240,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
        sceneContainerStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff',
        },
      }}
    >

  <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
  <Drawer.Screen name='Profile' component={ProfileScreen} />
</Drawer.Navigator>

  );
}
