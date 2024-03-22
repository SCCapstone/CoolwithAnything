import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const QRScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>QR Code</Text>
        <View style={{width: 24}}/>
      </View>
      <View style={styles.container}>
      <View style={styles.QRcontainer}>
        <Text style={styles.QRtext}>Scan the QR code below!</Text>
        <Image source={require('../images/SchedulerX-QR.png')} style={styles.QR} />
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
