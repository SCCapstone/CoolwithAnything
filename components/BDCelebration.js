import React from 'react';
import { View, Text, Image } from 'react-native';
import { format, parse } from 'date-fns'; // Import parse along with format
import getStyles from '../styles/HomeScreenStyles';
import { useTheme } from '../services/ThemeContext';
import CakeIcon from '../assets/cake-icon.png';

const BirthdayCelebration = ({ userName, isBirthday }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {isBirthday && (
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
