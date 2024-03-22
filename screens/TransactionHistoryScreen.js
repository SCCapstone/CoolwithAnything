import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const TransactionHistoryScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:1}}>
      <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <Text style={styles.title}>Transaction History</Text>
          <View style={{width: 24}}/>
        </View>
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Text style={styles.text}>You have not made any transactions.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    position: 'relative', 
  },
  header: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
    paddingHorizontal: 20,
  },
  backText: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  title: {
    marginTop: 30,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default TransactionHistoryScreen;
