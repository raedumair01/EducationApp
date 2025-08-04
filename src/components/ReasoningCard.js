// components/ReasoningCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../assets/fonts/fonts';
import CustomText from './CustomText';

const CARD_WIDTH = 280;
const CARD_HEIGHT = 164;
const OFFSET_TOP = 555;
const OFFSET_LEFT = -20;

export default function ReasoningCard() {
  return (
    <View style={[styles.wrapper, { left: OFFSET_LEFT, top: OFFSET_TOP }]}>
      <LinearGradient
        colors={['#D39646', '#D8B2DE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <CustomText type='title' style={styles.title}>Reasoning</CustomText>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 12, height: -14 },
    shadowRadius: 40,
    elevation: 10,
  },
  card: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '500',
    fontFamily: fonts.medium,
    letterSpacing: 0.03,
  },
});
