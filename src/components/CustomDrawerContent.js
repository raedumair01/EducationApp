import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../context/ThemeContext';
import { fonts } from '../assets/fonts/fonts';

const lightPurpleColors = {
  background: '#FFFFFF',
  card: '#F1EAFE',
  primary: '#8A4BD3',
};

const darkPurpleColors = {
  background: '#1E1B2E',
  card: '#3B2F4E',
  primary: '#C9A8FF',
};

export default function CustomDrawerContent({ navigation }) {
  const { isDarkMode } = useThemeContext();
  const theme = isDarkMode ? darkPurpleColors : lightPurpleColors;
  const styles = getStyles(theme);

  const menuItems = [
    { label: 'Home', icon: 'home-outline', screen: 'Home', isTab: true },
    { label: 'Subjects', icon: 'book-outline', screen: 'Subjects', isTab: true },
    { label: 'Profile', icon: 'person-outline', screen: 'Profile', isTab: false },
  ];

  const goToScreen = (screen, isTab) => {
    if (isTab) {
      navigation.navigate('Tabs');
      setTimeout(() => {
        navigation.navigate('Tabs', { screen });
      }, 100);
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawer}>
      <View style={styles.container}>
        {menuItems.map(({ label, icon, screen, isTab }) => (
          <TouchableOpacity
            key={label}
            style={styles.itemContainer}
            onPress={() => goToScreen(screen, isTab)}
          >
            <Ionicons name={icon} size={20} color={theme.primary} />
            <Text style={styles.item}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    drawer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: theme.card,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    item: {
      fontSize: 18,
      marginLeft: 15,
      color: theme.primary,
      fontFamily: fonts.medium,
    },
  });
