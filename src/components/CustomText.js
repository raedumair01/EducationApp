// src/components/CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { fonts } from '../assets/fonts/fonts';
import { lightColors, darkColors } from '../constants/theme';

const CustomText = ({
  children,
  style,
  type = 'body',
  align,
  color,
  bold,
  semiBold,
  medium,
  extraBold,
  ...props
}) => {
  const { isDarkMode } = useThemeContext();
  const themeColors = isDarkMode ? darkColors : lightColors;

  const getFontFamily = () => {
    if (extraBold) return fonts.extraBold;
    if (bold) return fonts.bold;
    if (semiBold) return fonts.semiBold;
    if (medium) return fonts.medium;
    return fonts.regular;
  };

  return (
    <Text
      style={[
        styles.base,
        styles[type] || styles.body,
        { fontFamily: getFontFamily() },
        align && { textAlign: align },
        color ? { color } : { color: themeColors.text },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    textTransform: 'none',
  },
  title: {
    fontSize: 28,
    
  },
  section: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 12,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
  },
  smallBold: {
    fontSize: 14,
  },
  tag: {
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  greeting: {
    fontSize: 22,
    marginTop: 20,
  },
  subtext: {
    fontSize: 14,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default CustomText;
