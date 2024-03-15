import React from 'react';
import { View, Text, Image } from 'react-native';
import { format, parse } from 'date-fns'; // Import parse along with format
import styles from '../styles/BDCelebrationStyle';
import CakeIcon from '../assets/cake-icon.png';

const BirthdayCelebration = ({ userName, birthday }) => {
  const today = new Date();
  const todayStr = format(today, 'MM/dd');

  let userBirthdayStr = '';
  let isUserBirthdayToday = false;

  // Function to validate and parse the birthday string
  const parseBirthday = (birthdayString) => {
    try {
      // Assuming birthday is in "MM/DD/YYYY" format
      const [month, day, year] = birthdayString.split('/');
      if (!month || !day || !year) throw new Error('Invalid date format');
      const parsedDate = new Date(year, month - 1, day);
      return format(parsedDate, 'MM/dd');
    } catch (error) {
      console.error('Error parsing date:', error);
      return '';
    }
  };

  if (birthday) {
    userBirthdayStr = parseBirthday(birthday);
    isUserBirthdayToday = todayStr === userBirthdayStr;
  }

  return (
    <View style={styles.container}>
      {isUserBirthdayToday && (
        <>
          <Text style={styles.greeting}>Happy Birthday, {userName}!</Text>
          <Image source={CakeIcon} style={styles.icon} />
          <Text style={styles.message}>
            Hope your day is as wonderful as you are!
          </Text>
        </>
      )}
    </View>
  );
};

export default BirthdayCelebration;
