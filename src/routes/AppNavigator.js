// src/routes/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomNavigation';
import { ThemeProvider } from '../context/ThemeContext';
import { HomeProvider } from '../context/HomeContext';
import DrawerNavigator from './DrawerNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import Toast from 'react-native-toast-message';
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <ThemeProvider>
      <HomeProvider>
        <NavigationContainer>
         <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
        </NavigationContainer>
        <Toast />
      </HomeProvider>
    </ThemeProvider>
  );
}
