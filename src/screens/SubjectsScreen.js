import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import MathsCard from '../components/MathematicsCard';
import PhysicsCard from '../components/PhysicsCard';
import ChemistryCard from '../components/ChemistryCard';
import ReasoningCard from '../components/ReasoningCard';

const SubjectsScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/pattern.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
           <MathsCard/>
        <PhysicsCard/>
        <ChemistryCard/>
        <ReasoningCard/>
        </ScrollView>
       
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#513174',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
});

export default SubjectsScreen;
