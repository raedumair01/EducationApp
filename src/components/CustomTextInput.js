// src/components/CustomTextInput.js
import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { fonts } from '../assets/fonts/fonts';

export default function CustomTextInput({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  RightIcon,
  style,
  ...rest
}) {
  const { isDarkMode } = useThemeContext();
  const theme = isDarkMode
    ? require('../constants/theme').darkColors
    : require('../constants/theme').lightColors;

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.subtext}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[
          styles.input,
          {
            color: theme.text,
            borderColor: theme.card,
            textAlignVertical: multiline ? 'top' : 'center',
          },
          style,
        ]}
        {...rest}
      />
      {RightIcon && (
        <View style={[
          styles.sendIconWrapper,
          {
            backgroundColor: isDarkMode ? '#1c1c1e' : '#fff',
            borderColor: isDarkMode ? '#444' : '#ccc',
          },
        ]}>
          {RightIcon}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    fontSize: 15,
    fontFamily: fonts.medium,
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 10,
    minHeight: 60,
    paddingRight: 44, // space for icon
  },
  sendIconWrapper: {
    position: 'absolute',
    right: 10,
    bottom: 13,
    padding: 8,
    borderRadius: 20,
    zIndex: 1,
  },
});
