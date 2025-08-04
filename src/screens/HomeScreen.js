// src/screens/HomeScreen.js
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { useHomeContext } from '../context/HomeContext';
import MenuSvg from '../assets/icons/MenuSvg';
import BellSvg from '../assets/icons/NotificationSvg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import GradientBox from '../components/GradientButton';
import { useNavigation } from '@react-navigation/native';
import { lightColors, darkColors, commonColors } from '../constants/theme';

export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const {
    firstName,
    lastName,
    pendingTests,
    announcements,
    upcomingTests,
    userImage
  } = useHomeContext();
  const navigation = useNavigation();

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuSvg width={24} height={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={22} color={colors.text} />
          </TouchableOpacity>
          <BellSvg width={24} height={24} color={colors.text} />
          <Image
            source={userImage ? { uri: userImage } : require('../assets/images/avatar.jpg')}
            style={styles.profile}
          />
        </View>
      </View>

      {/* GREETING */}
      <CustomText type="greeting" semiBold color={colors.text}>
        Hi {firstName} {lastName},
      </CustomText>
      <CustomText type="subtext" color={colors.subtext}>
        You have{' '}
        <CustomText type="body" bold color={colors.timeLeft}>
          {pendingTests} pending test
        </CustomText>{' '}
        this week
      </CustomText>

      {/* BANNER */}
      <View style={[styles.bannerContainer, { backgroundColor: colors.bannerBg }]}>
        <View style={[styles.ellipsePurple, { backgroundColor: colors.bannerPurple }]} />
        <View style={[styles.ellipseBlue, { backgroundColor: colors.bannerBlue }]} />
        <View style={styles.bannerContent}>
          <View>
            <View style={styles.pointsRow}>
              <CustomText extraBold style={[styles.pointsText, { color: colors.pointsText }]}>
                300
              </CustomText>
              <CustomText style={[styles.pointsLabel, { color: colors.pointsText }]}>
                Points
              </CustomText>
            </View>
            <CustomText style={[styles.pointsNote, { color: colors.pointsNote }]}>
              Cross 500 within the week to get a free One on One Class.
            </CustomText>
          </View>
          <TouchableOpacity style={[styles.testBtn, { backgroundColor: colors.testBtnBg }]}>
            <CustomText medium style={[styles.testBtnText, { color: colors.testBtnText }]}>
              Take test now
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>

      {/* ANNOUNCEMENTS */}
      {announcements.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.announcementScroll}>
          {announcements.map((note, index) => (
            <View key={index} style={[styles.announcementCard, { backgroundColor: colors.announcementBg }]}>
              <CustomText style={styles.announcementText}>{note}</CustomText>
            </View>
          ))}
        </ScrollView>
      )}

      {/* UPCOMING TESTS */}
      <CustomText type="sectionTitle" semiBold color={colors.text}>
        Upcoming Tests
      </CustomText>
      <View style={styles.upcomingGrid}>
        {upcomingTests.map((test) => (
          <GradientBox
            key={test.id}
            colors={getTestGradient(test.subject)}
            containerStyle={styles.upcomingGradientBox}
          >
            <CustomText semiBold style={styles.upcomingTitle}>
              {test.title}
            </CustomText>
            <CustomText style={styles.upcomingSubtitle}>
              {test.subject} • Due: {test.deadline}
            </CustomText>
          </GradientBox>
        ))}
      </View>

      {/* PENDING TESTS */}
      <CustomText type="sectionTitle" semiBold color={colors.text}>
        {pendingTests} Pending tests
      </CustomText>
      <View style={styles.cardsGrid}>
        {['Physics', 'Chemistry', 'Maths', 'Physics'].map((subj, i) => (
          <View key={i} style={[styles.testCard, { backgroundColor: colors.card }]}>
            <CustomText bold style={[styles.testTitle, { color: colors.text }]}>
              Law of Motion
            </CustomText>
            <View style={styles.testInfo}>
              <CustomText style={[styles.subjectTag, { backgroundColor: getTagColor(subj) }]}>
                {subj}
              </CustomText>
              <CustomText style={[styles.timeLeft, { color: colors.timeLeft }]}>
                ⏱ 1d:10Hr
              </CustomText>
            </View>
          </View>
        ))}
      </View>

      {/* SUBJECTS */}
      <CustomText type="sectionTitle" semiBold color={colors.text}>
        Subjects
      </CustomText>
      <View style={styles.subjectGrid}>
        {[{ name: 'Mathematics', colors: ['#548AD8', '#8A4BD3'] },
          { name: 'Chemistry', colors: ['#F33E62', '#F79334'] },
          { name: 'Physics', colors: ['#893E9C', '#F82B73'] },
          { name: 'Reasoning', colors: ['#D39646', '#CCCCCD'] },
        ].map((item, idx) => (
          <GradientBox key={idx} label={item.name} colors={item.colors} />
        ))}
      </View>
    </ScrollView>
  );
}

function getTagColor(subject) {
  switch (subject) {
    case 'Physics': return commonColors.physicsTag;
    case 'Chemistry': return commonColors.chemistryTag;
    case 'Maths': return commonColors.mathTag;
    default: return commonColors.defaultTag;
  }
}

function getTestGradient(subject) {
  switch (subject) {
    case 'Mathematics': return ['#548AD8', '#8A4BD3'];
    case 'Chemistry': return ['#F33E62', '#F79334'];
    case 'Physics': return ['#893E9C', '#F82B73'];
    default: return ['#999999', '#BBBBBB'];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginLeft: 8,
  },
  bannerContainer: {
    marginBottom: 20,
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  ellipsePurple: {
    position: 'absolute',
    width: 261,
    height: 180,
    top: 19,
    left: 100,
    opacity: 0.3,
    borderRadius: 130,
    transform: [{ rotate: '-30.81deg' }],
  },
  ellipseBlue: {
    position: 'absolute',
    width: 238,
    height: 164,
    top: -115,
    left: -85,
    borderRadius: 130,
    transform: [{ rotate: '-30.81deg' }],
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 34,
  },
  pointsLabel: {
    fontSize: 14,
    marginLeft: 4,
    bottom: 15,
  },
  pointsNote: {
    fontSize: 12,
    marginTop: 6,
    maxWidth: 160,
  },
  testBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },
  testBtnText: {
    fontSize: 12,
  },
  announcementScroll: {
    marginTop: 10,
    marginBottom: 16,
  },
  announcementCard: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginRight: 12,
  },
  announcementText: {
    fontSize: 13,
  },
  upcomingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  upcomingGradientBox: {
    width: '47%',
    padding: 14,
    borderRadius: 16,
  },
  upcomingTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  upcomingSubtitle: {
    color: '#f0f0f0',
    fontSize: 12,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
  },
  testCard: {
    width: '47%',
    borderRadius: 14,
    padding: 12,
  },
  testTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  testInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subjectTag: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeLeft: {
    fontSize: 10,
    bottom: -5,
  },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 12,
  },
});
