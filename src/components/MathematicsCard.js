import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../assets/fonts/fonts';
import CustomText from './CustomText';

const CARD_WIDTH = 340;
const CARD_HEIGHT = 164;

const MathsCard = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#548AD8', '#8A4BD3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <CustomText type='title' style={styles.title}>Mathematics</CustomText>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginLeft: -20,
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
    justifyContent: 'center',
    alignItems: 'center',
    bottom:-20
  },
  title: {
    fontSize: 23,
    color: '#fff',
    fontFamily: fonts.medium,
    letterSpacing: 1,
  },
});

export default MathsCard;
