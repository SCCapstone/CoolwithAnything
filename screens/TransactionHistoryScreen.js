import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../services/ThemeContext';
import { useNavigation } from '@react-navigation/core';
import getStyles from "../styles/TransactionHistoryStyles";

const TransactionHistoryScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={{ flex:1 }}>
      <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <Text style={styles.title}>Transaction History</Text>
          <View style={{width: 24}}/>
        </View>
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Text style={styles.transactionText}>You have not made any transactions.</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionHistoryScreen;
