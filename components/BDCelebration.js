import React from 'react';
import { View, Text, Image } from 'react-native';
import { format, parse } from 'date-fns'; // Import parse along with format
import styles from '../styles/BDCelebrationStyle';
import CakeIcon from '../assets/cake-icon.png';

const BirthdayCelebration = ({ userName, birthday }) => {
  const today = new Date();
  const todayStr = format(today, 'MM/dd');

  console.log("Birthday(BDC): ", birthday);
  let userBirthdayStr = '';
  let isUserBirthdayToday = false;

  const parseBirthday = (birthdayString) => {
    try {
      // Detect the separator used in the date string (assuming "/" or "-" as common separators)
      const separator = birthdayString.includes('/') ? '/' : birthdayString.includes('-') ? '-' : null;
      
      if (!separator) {
        throw new Error('Unsupported date format or separator');
      }
      
      const parts = birthdayString.split(separator);
      
      if (parts.length !== 3) {
        throw new Error('Invalid date format');
      }
      
      // Extract the month, day, and year assuming a consistent order
      let [month, day, year] = parts.map(part => parseInt(part, 10));
      
      // Basic validation of the date components
      if (isNaN(month) || month < 1 || month > 12 || isNaN(day) || day < 1 || day > 31 || isNaN(year) || year < 1000 || year > 9999) {
        throw new Error('Invalid date components');
      }
      
      // Adjust for JavaScript's zero-based month indexing
      const parsedDate = new Date(year, month - 1, day);
      
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date value');
      }
      
      return format(parsedDate, 'MM/dd');
    } catch (error) {
      console.error('Error parsing date:', error.message);
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
