import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const QRScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.QRcontainer}>
        <Text style={styles.QRtext}>Scan the QR code below!</Text>
        <Image source={require('../components/SchedulerX-QR.png')} style={styles.QR} />
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
    position: 'absolute', 
    top: 45, 
    left: 20, 
    zIndex: 1, 
  },
  backText: {
    fontSize: 18,
    fontWeight: '700',
  },
  QRcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  QR: {
    width: 380,
    height: 380,
  },
  QRtext: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  }
});

export default QRScreen;
