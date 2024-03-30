import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import getStyles from '../styles/HomeScreenStyles';
import { useTheme } from "../services/ThemeContext";

const AccountButton = ({navigation}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const onAccountPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.accountContainer}>
      <TouchableOpacity onPress={onAccountPress}>
        <Text style={styles.accountButton}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountButton;