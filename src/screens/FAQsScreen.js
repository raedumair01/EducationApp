// src/screens/FaqScreen.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/theme';
import { fonts } from '../assets/fonts/fonts';

import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';

const FaqScreen = () => {
  const { isDarkMode } = useThemeContext();
  const theme = isDarkMode ? darkColors : lightColors;

  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    { name: 'Mathematics', colors: ['#548AD8', '#8A4BD3'] },
    { name: 'Chemistry', colors: ['#F33E62', '#F79334'] },
    { name: 'Physics', colors: ['#893E9C', '#F82B73'] },
    { name: 'Reasoning', colors: ['#D39646', '#CCCCCD'] },
  ];

  const faqs = [
    'The average of first 50 natural numbers?',
    'What is Newton’s second law?',
    'Explain the periodic table.',
    'How to solve quadratic equations?',
    'Logical reasoning tricks?',
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setMessage('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <View style={[styles.screenWrapper, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CustomText style={[styles.title, { color: theme.text }]}>
          Type your question below and get answered in less than 30 minutes
        </CustomText>

        <CustomTextInput
          placeholder="Type your question..."
          value={message}
          onChangeText={setMessage}
          multiline
          RightIcon={
            message.length > 0 && (
              <TouchableOpacity onPress={handleSend}>
                <Icon name="send" size={24} color="#495ECA" />
              </TouchableOpacity>
            )
          }
        />

        {submitted && (
          <View style={styles.successWrapper}>
            <CustomText style={styles.successMessage}>
              Thank you for your message!
            </CustomText>
          </View>
        )}

        <CustomText semiBold style={[styles.sectionTitle, { color: theme.text }]}>
          Subjects
        </CustomText>

        <View style={styles.subjectGrid}>
          {subjects.map((item, index) => (
            <GradientBox key={index} label={item.name} colors={item.colors} />
          ))}
        </View>

        <CustomText semiBold style={[styles.sectionTitle, { color: theme.text }]}>
          Frequently asked questions:
        </CustomText>

        {faqs.map((question, index) => (
          <View key={index} style={[styles.faqBox, { backgroundColor: theme.card }]}>
            <CustomText regular style={[styles.faqText, { color: theme.text }]}>
              {question}
            </CustomText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const GradientBox = ({ label, colors }) => (
  <LinearGradient colors={colors} style={styles.subjectBox}>
    <CustomText medium style={styles.subjectText}>
      {label}
    </CustomText>
  </LinearGradient>
);

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    paddingTop: 50,
    fontSize: 15,
    marginBottom: 15,
  },
  successWrapper: {
    marginTop: 10,
    backgroundColor: '#d4edda',
    borderRadius: 8,
    padding: 10,
  },
  successMessage: {
    color: '#155724',
    fontSize: 14,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    marginVertical: 12,
  },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 12,
  },
  subjectBox: {
    width: '45%',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  subjectText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: fonts.semiBold,
  },
  faqBox: {
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  faqText: {
    fontSize: 15,
  },
});

export default FaqScreen;
