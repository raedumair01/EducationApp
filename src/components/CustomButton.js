// src/components/CustomButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function CustomButton({ title, onPress, style, textStyle }) {
  const { isDarkMode } = useThemeContext();

  const styles = getStyles(isDarkMode);

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    button: {
      backgroundColor: isDarkMode ? '#4E9F3D' : '#1E90FF',
      paddingVertical: hp('1.8%'),
      borderRadius: wp('3%'),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp('1.5%'),
    },
    buttonText: {
      color: '#fff',
      fontSize: wp('4.2%'),
      fontWeight: '600',
    },
  });
