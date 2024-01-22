import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import CategoryCounter from '../components/CategoryCounter';
import DateTracker from '../components/DateTracker';
import Calendar from '../components/Calendar';
import AccountButton from '../components/AccountButton';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <DateTracker month="January" year={2021}/>
      <AccountButton navigation={navigation}/>
      <ProgressBar progress={40} />
      <View style={styles.categoryContainer}>
        <CategoryCounter count={3} label="School" color="gold" />
        <CategoryCounter count={2} label="Personal" color="skyblue" />
        <CategoryCounter count={1} label="Gym" color="salmon" />
      </View>
      <Calendar />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default HomeScreen;
