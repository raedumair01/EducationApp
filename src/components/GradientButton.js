// components/GradientBox.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import { fonts } from '../assets/fonts/fonts';

export default function GradientBox({ label, colors, children, containerStyle }) {
  return (
    <LinearGradient colors={colors} style={[styles.box, containerStyle]}>
      {label && <CustomText style={styles.label}>{label}</CustomText>}
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '47%',
    marginBottom: 12,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontFamily:fonts.semiBold
  },
});
