import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/QRStyles";

const QRScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={{ flex: 1 }}>
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

export default QRScreen;
