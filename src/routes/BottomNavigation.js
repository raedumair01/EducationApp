import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/theme';
import FAQScreen from '../screens/FAQsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { isDarkMode } = useThemeContext();
  const theme = isDarkMode ? darkColors : lightColors;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Subjects') {
            iconName = 'book-outline';
            
          }
          else if (route.name === 'FAQs') {
            iconName = 'help-circle-outline';
            
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: theme.bannerBg,
        tabBarInactiveTintColor: theme.subtext,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.card,
          height: 64,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Subjects" component={SubjectsScreen} />
      <Tab.Screen name ="FAQs" component={FAQScreen}></Tab.Screen> 
         </Tab.Navigator>
  );
}
