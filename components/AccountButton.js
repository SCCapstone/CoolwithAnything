import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AccountButton = ({navigation}) => {
  const onAccountPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.dateTrackerContainer}>
      <TouchableOpacity onPress={onAccountPress} style={styles.accountButton}>
        <Text style={styles.accountButtonText} fontSize={30}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateTrackerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  monthYearText: {
    fontSize: 24,
  },
  accountButton: {
    
  },
  accountButtonText: {
    
  },
});
export default AccountButton;